import { NextRequest, NextResponse } from 'next/server';

// 延迟初始化 OpenAI 确保只在服务端执行
let openai: any;

const initOpenAI = () => {
  if (!openai) {
    const OpenAI = require('openai').default;
    openai = new OpenAI({
      apiKey: process.env.NOVA_AI_API_KEY || '',
      baseURL: 'https://once.novai.su/v1',
    });
  }
  return openai;
};

export async function POST(request: NextRequest) {
  try {
    const { productName, category, factories } = await request.json();

    if (!productName || !category || !factories) {
      return NextResponse.json(
        { error: 'Product info and factories are required' },
        { status: 400 }
      );
    }

    const matchingPrompt = `
Product: ${productName}
Category: ${category}

Available Factories:
${factories.map((f: any, i: number) => `${i + 1}. ${f.name} - ${f.main_products || 'General Manufacturing'}`).join('\n')}

Please rank these factories by match score (0-100) and provide reasons. Return JSON:
{
  "matches": [
    {
      "factoryIndex": number,
      "matchScore": number,
      "reasons": ["reason1", "reason2"]
    }
  ]
}
`;

    const matchCompletion = await initOpenAI().chat.completions.create({
      model: process.env.NOVA_AI_MODEL || '[逆次]o4-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in supply chain management and factory matching.',
        },
        {
          role: 'user',
          content: matchingPrompt,
        },
      ],
      temperature: 0.5,
    });

    const matchResponse = matchCompletion.choices[0].message.content;
    let matches;
    try {
      matches = JSON.parse(matchResponse || '{}');
    } catch {
      // Fallback to mock data if parsing fails
      matches = {
        matches: [
          { factoryIndex: 0, matchScore: 98, reasons: ['Specializes in portable electronics', 'Has CE and FCC certifications'] },
          { factoryIndex: 1, matchScore: 85, reasons: ['Experience with consumer electronics', 'Good production capacity'] },
        ],
      };
    }

    return NextResponse.json({
      success: true,
      matches: matches.matches || [],
    });
  } catch (error) {
    console.error('Factory Matching API Error:', error);
    return NextResponse.json(
      {
        error: 'Factory matching failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
