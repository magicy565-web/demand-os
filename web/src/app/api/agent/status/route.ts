// /api/agent/status - 获取任务状态

import { NextRequest, NextResponse } from 'next/server';
import { getTask } from '@/lib/agent-engine/task-storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json({ error: 'taskId is required' }, { status: 400 });
    }

    const task = await getTask(taskId);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({
      taskId: task.taskId,
      status: task.status,
      plan: task.plan.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        icon: s.icon,
        type: s.type,
        status: s.status,
        result: s.result,
        error: s.error,
      })),
      results: task.results,
      error: task.error,
    });
  } catch (error: any) {
    console.error('[API /agent/status] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
