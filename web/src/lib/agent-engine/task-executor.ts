// task-executor.ts - 任务执行引擎

import { Step, ProgressUpdate } from '../agents/types';

export class TaskExecutor {
  private taskId: string;
  private steps: Step[];
  private onProgress: (update: ProgressUpdate) => void;

  constructor(
    taskId: string,
    steps: Step[],
    onProgress: (update: ProgressUpdate) => void
  ) {
    this.taskId = taskId;
    this.steps = steps;
    this.onProgress = onProgress;
  }

  async execute(context: any): Promise<any> {
    const results: any = {};

    for (const step of this.steps) {
      try {
        // 如果是 user_input 类型，跳过自动执行，等待用户输入
        if (step.type === 'user_input') {
          console.log(`[TaskExecutor] Step ${step.id} is user_input, waiting for user action`);
          
          // 更新状态为 running，表示等待用户输入
          step.status = 'running';
          this.onProgress({
            type: 'step_start',
            stepId: step.id,
            status: 'running',
          });

          // 执行 action 获取需要渲染的组件信息
          const result = await step.action(context);
          step.result = result.data;
          results[step.id] = result;

          // 推送组件信息到前端
          this.onProgress({
            type: 'step_complete',
            stepId: step.id,
            status: 'running', // 仍然是 running，等待用户完成输入
            result: result,
          });

          // 暂停执行，等待用户输入
          break;
        }

        // 如果是 system_action 类型，自动执行
        if (step.type === 'system_action') {
          console.log(`[TaskExecutor] Executing step ${step.id}`);
          
          // 更新状态为 running
          step.status = 'running';
          this.onProgress({
            type: 'step_start',
            stepId: step.id,
            status: 'running',
          });

          // 执行步骤
          const result = await step.action(context);

          if (!result.success) {
            throw new Error(result.error || 'Step execution failed');
          }

          // 更新状态为 completed
          step.status = 'completed';
          step.result = result.data;
          results[step.id] = result.data;

          this.onProgress({
            type: 'step_complete',
            stepId: step.id,
            status: 'completed',
            result: result,
          });

          // 将结果合并到 context，供后续步骤使用
          Object.assign(context, result.data);
        }
      } catch (error: any) {
        console.error(`[TaskExecutor] Step ${step.id} failed:`, error);
        
        step.status = 'failed';
        step.error = error.message;

        this.onProgress({
          type: 'step_error',
          stepId: step.id,
          status: 'failed',
          error: error.message,
        });

        throw error; // 停止执行
      }
    }

    return results;
  }

  // 继续执行（用户完成输入后调用）
  async continueExecution(context: any, currentStepId: string): Promise<any> {
    const currentStepIndex = this.steps.findIndex(s => s.id === currentStepId);
    
    if (currentStepIndex === -1) {
      throw new Error(`Step ${currentStepId} not found`);
    }

    // 标记当前步骤为 completed
    this.steps[currentStepIndex].status = 'completed';
    this.onProgress({
      type: 'step_complete',
      stepId: currentStepId,
      status: 'completed',
    });

    // 继续执行后续步骤
    const remainingSteps = this.steps.slice(currentStepIndex + 1);
    const results: any = {};

    for (const step of remainingSteps) {
      try {
        if (step.type === 'user_input') {
          step.status = 'running';
          this.onProgress({
            type: 'step_start',
            stepId: step.id,
            status: 'running',
          });

          const result = await step.action(context);
          step.result = result.data;
          results[step.id] = result;

          this.onProgress({
            type: 'step_complete',
            stepId: step.id,
            status: 'running',
            result: result,
          });

          break; // 等待用户输入
        }

        if (step.type === 'system_action') {
          step.status = 'running';
          this.onProgress({
            type: 'step_start',
            stepId: step.id,
            status: 'running',
          });

          const result = await step.action(context);

          if (!result.success) {
            throw new Error(result.error || 'Step execution failed');
          }

          step.status = 'completed';
          step.result = result.data;
          results[step.id] = result.data;

          this.onProgress({
            type: 'step_complete',
            stepId: step.id,
            status: 'completed',
            result: result,
          });

          Object.assign(context, result.data);
        }
      } catch (error: any) {
        step.status = 'failed';
        step.error = error.message;

        this.onProgress({
          type: 'step_error',
          stepId: step.id,
          status: 'failed',
          error: error.message,
        });

        throw error;
      }
    }

    return results;
  }
}
