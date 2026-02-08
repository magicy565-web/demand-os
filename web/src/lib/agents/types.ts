// Agent 和 Step 的类型定义

export interface Agent {
  id: string;                          // Agent 唯一标识
  name: string;                        // Agent 名称
  description: string;                 // Agent 描述
  triggers: string[];                  // 触发关键词
  planner: (prompt: string, context: any) => Promise<Step[]>; // 任务规划器
}

export interface Step {
  id: string;                          // 步骤唯一标识
  name: string;                        // 步骤名称
  description?: string;                // 步骤描述
  icon?: string;                       // 步骤图标
  type: 'user_input' | 'system_action'; // 步骤类型
  action: (context: any) => Promise<StepResult>; // 执行函数
  
  // 运行时状态
  status: 'pending' | 'running' | 'completed' | 'failed';
  log: string[];                       // 执行日志
  result?: any;                        // 执行结果
  error?: string;                      // 错误信息
}

export interface StepResult {
  success: boolean;
  data?: any;
  error?: string;
  // 如果是 user_input 类型，可以包含需要渲染的组件信息
  componentType?: 'form' | 'analysis' | 'strategy' | 'deal';
  componentProps?: any;
}

export interface Task {
  taskId: string;
  userId: string;
  prompt: string;
  agentId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  plan: Step[];
  context: any;
  results: any;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressUpdate {
  type: 'step_start' | 'step_complete' | 'step_error' | 'task_complete' | 'task_error';
  stepId?: string;
  status?: string;
  result?: any;
  error?: string;
  results?: any;
}
