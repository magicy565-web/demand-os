/**
 * API Route: Match Factories from Directus Database
 * 
 * This endpoint queries real factory data from Directus and uses AI
 * to match factories with product requirements.
 * Implements Phase 1 Task 2 from the optimization plan.
 */

import { NextRequest, NextResponse } from 'next/server';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

interface FactoryMatchRequest {
  productName: string;
  category: string;
  keyFeatures?: string[];
  moqPreference?: number;
}

interface FactoryData {
  id: string;
  name: string;
  industrial_belt_id?: string;
  main_products?: string[];
  moq?: number;
  lead_time?: number;
  certifications?: any;
  status?: string;
  category?: string;
  capabilities?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { productName, category, keyFeatures, moqPreference }: FactoryMatchRequest = await request.json();

    if (!productName || !category) {
      return NextResponse.json(
        { error: 'Product name and category are required' },
        { status: 400 }
      );
    }

    console.log('[Factory Matcher] Matching factories for:', { productName, category });

    // Step 1: Query factories from Directus
    let factories: FactoryData[] = [];
    let directusAvailable = true;

    try {
      console.log('[Factory Matcher] Querying Directus database...');
      
      const response = await directus.request(
        readItems('factories', {
          limit: -1,
          fields: ['*'],
          filter: {
            status: {
              _eq: 'published'
            }
          }
        })
      );

      factories = response as FactoryData[];
      console.log(`[Factory Matcher] Found ${factories.length} factories in Directus`);

    } catch (directusError) {
      console.error('[Factory Matcher] Directus query failed:', directusError);
      directusAvailable = false;

      // Fallback: Use demo factory data
      factories = getFallbackFactories();
      console.log(`[Factory Matcher] Using ${factories.length} fallback factories`);
    }

    if (factories.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No factories available',
        matches: [],
        source: directusAvailable ? 'directus' : 'fallback',
      });
    }

    // Step 2: Filter factories by category (basic matching)
    const categoryKeywords = getCategoryKeywords(category);
    const relevantFactories = factories.filter(factory => {
      if (!factory.main_products || factory.main_products.length === 0) {
        return false;
      }

      const factoryProducts = factory.main_products.join(' ').toLowerCase();
      return categoryKeywords.some(keyword => factoryProducts.includes(keyword));
    });

    console.log(`[Factory Matcher] ${relevantFactories.length} factories match category "${category}"`);

    // Step 3: Use AI to score and rank factories
    const factoriesToMatch = relevantFactories.length > 0 
      ? relevantFactories.slice(0, 10) 
      : factories.slice(0, 10);

    let aiMatches: any[] = [];

    try {
      console.log('[Factory Matcher] Using AI for intelligent matching...');
      
      const aiResponse = await fetch('https://once.novai.su/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NOVA_AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: '[逆次]o4-mini',
          messages: [
            {
              role: 'system',
              content: `你是一个专业的工厂匹配专家。根据产品需求，从工厂列表中选择最匹配的工厂。

返回 JSON 格式（只返回 JSON，不要其他文字）：
{
  "matches": [
    {
      "factoryIndex": 工厂索引（数字）,
      "matchScore": 匹配分数（0-100）,
      "reasons": ["匹配原因1", "匹配原因2"]
    }
  ]
}

评分标准：
- 产品类别匹配度（40%）
- 生产能力和MOQ（30%）
- 认证和质量（20%）
- 交货时间（10%）`
            },
            {
              role: 'user',
              content: `产品需求：
- 产品名称：${productName}
- 类别：${category}
- 关键特征：${keyFeatures?.join(', ') || 'N/A'}
- MOQ偏好：${moqPreference || 'N/A'}

工厂列表：
${factoriesToMatch.map((f, idx) => `${idx}. ${f.name} - 主营产品：${f.main_products?.join(', ') || 'N/A'} - MOQ：${f.moq || 'N/A'}`).join('\n')}

请选择最匹配的3-5个工厂并评分。`
            }
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        const aiContent = aiData.choices[0]?.message?.content || '';
        console.log('[Factory Matcher] AI Response:', aiContent);

        const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          aiMatches = parsed.matches || [];
        }
      }
    } catch (aiError) {
      console.error('[Factory Matcher] AI matching failed:', aiError);
    }

    // Step 4: Build final match results
    let matches;

    if (aiMatches.length > 0) {
      // Use AI-generated matches
      matches = aiMatches.map((match: any) => {
        const factory = factoriesToMatch[match.factoryIndex];
        return {
          factoryId: factory?.id || 'unknown',
          factoryName: factory?.name || 'Unknown Factory',
          matchScore: match.matchScore,
          matchReasons: match.reasons,
          moq: factory?.moq,
          leadTime: factory?.lead_time,
          certifications: factory?.certifications,
        };
      }).filter((m: any) => m.factoryId !== 'unknown');
    } else {
      // Fallback: Use simple scoring
      matches = factoriesToMatch.slice(0, 5).map((factory, idx) => ({
        factoryId: factory.id,
        factoryName: factory.name,
        matchScore: 95 - idx * 10,
        matchReasons: [
          `Specializes in ${category}`,
          factory.certifications ? 'Has quality certifications' : 'Reliable supplier',
          factory.moq ? `MOQ: ${factory.moq} units` : 'Flexible MOQ',
        ],
        moq: factory.moq,
        leadTime: factory.lead_time,
        certifications: factory.certifications,
      }));
    }

    console.log(`[Factory Matcher] Matched ${matches.length} factories`);

    return NextResponse.json({
      success: true,
      matches,
      totalFactories: factories.length,
      source: directusAvailable ? 'directus' : 'fallback',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[Factory Matcher] Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to match factories',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Get category-related keywords for filtering
 */
function getCategoryKeywords(category: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'Electronics': ['electronic', 'electronics', 'gadget', 'device', 'tech', 'digital', 'smart'],
    'Fashion': ['fashion', 'clothing', 'apparel', 'textile', 'garment', 'wear'],
    'Beauty': ['beauty', 'cosmetic', 'skincare', 'makeup', 'personal care'],
    'Home & Garden': ['home', 'garden', 'furniture', 'household', 'decor', 'living'],
    'Sports': ['sport', 'fitness', 'athletic', 'outdoor', 'exercise'],
    'Toys': ['toy', 'game', 'puzzle', 'play', 'children'],
    'Pet Supplies': ['pet', 'animal', 'dog', 'cat'],
    'Health': ['health', 'medical', 'wellness', 'healthcare'],
  };

  return keywordMap[category] || [category.toLowerCase()];
}

/**
 * Fallback factory data when Directus is unavailable
 */
function getFallbackFactories(): FactoryData[] {
  return [
    {
      id: 'factory-001',
      name: 'Shenzhen Tech Manufacturing Co., Ltd.',
      category: 'Electronics',
      main_products: ['Consumer Electronics', 'Smart Devices', 'Portable Gadgets'],
      moq: 500,
      lead_time: 25,
      certifications: ['CE', 'FCC', 'RoHS'],
      status: 'published',
    },
    {
      id: 'factory-002',
      name: 'Guangzhou Smart Devices Ltd.',
      category: 'Electronics',
      main_products: ['Home Appliances', 'Electronic Accessories', 'IoT Devices'],
      moq: 1000,
      lead_time: 30,
      certifications: ['CE', 'ISO9001'],
      status: 'published',
    },
    {
      id: 'factory-003',
      name: 'Dongguan Precision Factory',
      category: 'Electronics',
      main_products: ['Plastic Injection', 'Electronic Assembly', 'OEM/ODM'],
      moq: 300,
      lead_time: 20,
      certifications: ['ISO9001', 'ISO14001'],
      status: 'published',
    },
    {
      id: 'factory-004',
      name: 'Ningbo Fashion Textiles Co.',
      category: 'Fashion',
      main_products: ['Clothing', 'Apparel', 'Textile Products'],
      moq: 500,
      lead_time: 35,
      certifications: ['BSCI', 'WRAP'],
      status: 'published',
    },
    {
      id: 'factory-005',
      name: 'Yiwu Home & Garden Supplies',
      category: 'Home & Garden',
      main_products: ['Home Decor', 'Garden Tools', 'Household Items'],
      moq: 200,
      lead_time: 28,
      certifications: ['CE'],
      status: 'published',
    },
  ];
}
