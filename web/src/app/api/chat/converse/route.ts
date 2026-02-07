import { NextRequest, NextResponse } from 'next/server';
import { getWorkflowTemplate, WorkflowStep } from '@/lib/workflow-templates';

// 简单的内存会话存储（生产环境应使用 Redis）
const sessionStore = new Map<string, SessionState>();

interface SessionState {
  currentWorkflowId: string;
  currentStepId: string;
  context: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userInput, workflowId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    // 获取或初始化会话状态
    let session = sessionStore.get(sessionId);

    // 如果是新会话，初始化状态
    if (!session) {
      if (!workflowId) {
        return NextResponse.json({ error: 'workflowId is required for new session' }, { status: 400 });
      }

      const workflow = getWorkflowTemplate(workflowId);
      if (!workflow) {
        return NextResponse.json({ error: 'Invalid workflowId' }, { status: 400 });
      }

      session = {
        currentWorkflowId: workflowId,
        currentStepId: workflow.initialStep,
        context: {},
      };
      sessionStore.set(sessionId, session);
    }

    // 获取当前工作流和步骤
    const workflow = getWorkflowTemplate(session.currentWorkflowId);
    if (!workflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 500 });
    }

    let currentStep = workflow.steps[session.currentStepId];
    if (!currentStep) {
      return NextResponse.json({ error: 'Current step not found' }, { status: 500 });
    }

    // 处理用户输入
    if (userInput && currentStep.type === 'user_input' && currentStep.inputKey) {
      session.context[currentStep.inputKey] = userInput;
    }

    // 执行步骤并转移到下一个步骤
    let systemMessage = '';
    let isWaitingForInput = false;
    let isCompleted = false;

    while (true) {
      currentStep = workflow.steps[session.currentStepId];

      // 执行 system_action
      if (currentStep.type === 'system_action' && currentStep.action) {
        // 获取消息
        systemMessage = typeof currentStep.message === 'function'
          ? currentStep.message(session.context)
          : currentStep.message;

        // 执行动作
        const actionResult = await currentStep.action(session.context);
        Object.assign(session.context, actionResult);

        // 转移到下一个步骤
        const nextStepId = determineNextStep(currentStep, session.context);
        if (!nextStepId) {
          return NextResponse.json({ error: 'No valid transition found' }, { status: 500 });
        }
        session.currentStepId = nextStepId;

        // 继续循环，直到遇到 user_input 或 end
        continue;
      }

      // 处理 user_input
      if (currentStep.type === 'user_input') {
        systemMessage = typeof currentStep.message === 'function'
          ? currentStep.message(session.context)
          : currentStep.message;

        // 如果用户刚刚提供了输入，转移到下一个步骤
        if (userInput && currentStep.inputKey) {
          const nextStepId = determineNextStep(currentStep, session.context);
          if (!nextStepId) {
            return NextResponse.json({ error: 'No valid transition found' }, { status: 500 });
          }
          session.currentStepId = nextStepId;
          // 清空 userInput 标记，继续循环
          userInput = null;
          continue;
        }

        // 否则，等待用户输入
        isWaitingForInput = true;
        break;
      }

      // 处理 end
      if (currentStep.type === 'end') {
        systemMessage = typeof currentStep.message === 'function'
          ? currentStep.message(session.context)
          : currentStep.message;
        isCompleted = true;
        break;
      }

      // 未知步骤类型
      return NextResponse.json({ error: 'Unknown step type' }, { status: 500 });
    }

    // 保存会话状态
    sessionStore.set(sessionId, session);

    // 返回响应
    return NextResponse.json({
      sessionId,
      systemMessage,
      isWaitingForInput,
      isCompleted,
    });
  } catch (error: any) {
    console.error('Error in converse API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// 根据 transitions 确定下一个步骤
function determineNextStep(step: WorkflowStep, context: Record<string, any>): string | null {
  for (const transition of step.transitions) {
    if (!transition.condition || transition.condition(context)) {
      return transition.target;
    }
  }
  return null;
}
