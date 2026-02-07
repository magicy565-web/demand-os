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
    const { productName, category, trendScore } = await request.json();

    if (!productName || !category || trendScore === undefined) {
      return NextResponse.json(
        { error: 'Product info and trend score are required' },
        { status: 400 }
      );
    }

    const pricingPrompt = `
Product: ${productName}
Category: ${category}
Trend Score: ${trendScore}

Calculate realistic pricing for:
1. Dropshipping (single unit)
2. Wholesale (500+ units)
3. Exclusive supply (5000+ units)

Return JSON:
{
  "dropshipping": { "price": number, "moq": 1 },
  "wholesale": { "price": number, "moq": 500 },
  "exclusive": { "price": number, "moq": 5000 },
  "estimatedRevenue": number,
  "estimatedProfit": number,
  "profitMargin": number,
  "paybackDays": number,
  "riskLevel": "low" | "medium" | "high"
}
`;

    const pricingCompletion = await initOpenAI().chat.completions.create({
      model: process.env.NOVA_AI_MODEL || '[逆次]o4-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in e-commerce pricing and financial analysis.',
        },
        {
          role: 'user',
          content: pricingPrompt,
        },
      ],
      temperature: 0.5,
    });

    const pricingResponse = pricingCompletion.choices[0].message.content;
    let pricing;
    try {
      pricing = JSON.parse(pricingResponse || '{}');
    } catch {
      // Fallback to mock data if parsing fails
      pricing = {
        dropshipping: { price: 8.5, moq: 1 },
        wholesale: { price: 3.2, moq: 500 },
        exclusive: { price: 2.85, moq: 5000 },
        estimatedRevenue: 125000,
        estimatedProfit: 73000,
        profitMargin: 58.4,
        paybackDays: 14,
        riskLevel: 'low',
      };
    }

    return NextResponse.json({
      success: true,
      pricing,
    });
  } catch (error) {
    console.error('Pricing Calculation API Error:', error);
    return NextResponse.json(
      {
        error: 'Pricing calculation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
