import { NextRequest, NextResponse } from 'next/server';
import { ViralTrackerAgentFlow } from '@/lib/agent-engine-v2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tiktokUrl } = body;

    if (!tiktokUrl) {
      return NextResponse.json(
        { error: 'TikTok URL is required' },
        { status: 400 }
      );
    }

    // 创建 Agent Flow 实例
    const agent = new ViralTrackerAgentFlow();

    // 运行 Agent Flow
    const result = await agent.run(tiktokUrl);

    return NextResponse.json({
      success: true,
      result,
      steps: agent.getSteps(),
    });
  } catch (error) {
    console.error('Agent Flow API Error:', error);
    return NextResponse.json(
      {
        error: 'Agent Flow execution failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
