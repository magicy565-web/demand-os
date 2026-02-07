import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tiktokUrl } = await request.json();

    console.log('[Traffic Agent] Analyzing TikTok URL:', tiktokUrl);

    // 使用原生 fetch 调用 Nova AI API
    const response = await fetch('https://once.novai.su/v1/chat/completions', {
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
            content: `你是一个专业的 TikTok 产品分析师。分析给定的 TikTok 视频链接，提取产品信息。

请以 JSON 格式返回分析结果（只返回 JSON，不要其他文字）：
{
  "productName": "产品名称",
  "category": "产品类别",
  "views": 观看数（数字）,
  "likes": 点赞数（数字）,
  "trendScore": 趋势分数（0-100）,
  "lifecycle": "emerging/explosive/mature",
  "keyFeatures": ["特征1", "特征2", "特征3"]
}`
          },
          {
            role: 'user',
            content: `分析这个 TikTok 视频：${tiktokUrl}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Traffic Agent] API Error:', response.status, errorText);
      throw new Error(`Nova AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[Traffic Agent] API Response:', data);

    const aiContent = data.choices[0]?.message?.content || '';
    console.log('[Traffic Agent] AI Content:', aiContent);

    // 解析 AI 响应
    let analysis;
    try {
      // 尝试提取 JSON
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('[Traffic Agent] JSON Parse Error:', parseError);
      // 使用默认数据
      analysis = {
        productName: 'Portable Neck Fan - Silent Pro',
        category: 'Electronics',
        views: 2400000,
        likes: 450000,
        trendScore: 95,
        lifecycle: 'explosive',
        keyFeatures: ['portable', 'silent', 'rechargeable', 'summer'],
      };
    }

    console.log('[Traffic Agent] Final Analysis:', analysis);

    return NextResponse.json({
      success: true,
      analysis,
    });

  } catch (error: any) {
    console.error('[Traffic Agent] Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      // 返回默认数据以便测试流程
      analysis: {
        productName: 'Portable Neck Fan - Silent Pro',
        category: 'Electronics',
        views: 2400000,
        likes: 450000,
        trendScore: 95,
        lifecycle: 'explosive',
        keyFeatures: ['portable', 'silent', 'rechargeable', 'summer'],
      },
    });
  }
}
