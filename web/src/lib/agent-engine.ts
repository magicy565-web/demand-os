import { ViralTrendTask, AgentStep, AgentLog } from '../types/agent-flow';

/**
 * 模拟爆款追踪 Agent 的核心处理流
 */
export class ViralTrackerAgent {
  private tasks: ViralTrendTask[] = [];
  private logs: AgentLog[] = [];
  private onUpdate: (task: ViralTrendTask, log: AgentLog) => void;

  constructor(onUpdate: (task: ViralTrendTask, log: AgentLog) => void) {
    this.onUpdate = onUpdate;
  }

  private addLog(taskId: string, message: string, level: AgentLog['level'] = 'info') {
    const log: AgentLog = {
      id: Math.random().toString(36).substr(2, 9),
      taskId,
      message,
      level,
      timestamp: new Date().toISOString(),
    };
    this.logs.push(log);
    return log;
  }

  /**
   * 启动一个新的爆款追踪任务
   */
  async startTracking(url: string): Promise<string> {
    const taskId = `task-${Math.random().toString(36).substr(2, 9)}`;
    
    const newTask: ViralTrendTask = {
      id: taskId,
      sourceUrl: url,
      trendMetrics: {
        views: '0',
        likes: '0',
        growthVelocity: 0,
      },
      steps: [
        { id: 'step-1', name: '流量发现 (Traffic Discovery)', description: '扫描 TikTok 趋势并提取产品特征', status: 'idle', timestamp: '' },
        { id: 'step-2', name: '产能寻源 (Capacity Sourcing)', description: '匹配经过验证的工厂并获取实时报价', status: 'idle', timestamp: '' },
        { id: 'step-3', name: '素材生成 (Asset Generation)', description: '获取原始生产视频并生成营销包', status: 'idle', timestamp: '' },
        { id: 'step-4', name: '闭环预测 (Loop Prediction)', description: '计算 ROI 并锁定独家产能', status: 'idle', timestamp: '' },
      ],
      overallStatus: 'processing',
    };

    this.tasks.push(newTask);
    this.processTask(taskId);
    return taskId;
  }

  private async processTask(taskId: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    // --- Step 1: Traffic Discovery ---
    this.updateStep(task, 'step-1', 'processing');
    this.onUpdate(task, this.addLog(taskId, '正在分析 TikTok 视频流量数据...'));
    await this.delay(2000);
    task.trendMetrics = { views: '1.2M', likes: '245K', growthVelocity: 8.5 };
    task.productTitle = 'Portable Neck Fan - Silent Pro';
    this.updateStep(task, 'step-1', 'completed');
    this.onUpdate(task, this.addLog(taskId, '产品特征提取完成: Portable Neck Fan', 'success'));

    // --- Step 2: Capacity Sourcing ---
    this.updateStep(task, 'step-2', 'processing');
    this.onUpdate(task, this.addLog(taskId, '正在扫描全球工厂数据库匹配产能...'));
    await this.delay(2500);
    task.matchedFactoryId = 'factory-88';
    this.updateStep(task, 'step-2', 'completed');
    this.onUpdate(task, this.addLog(taskId, '已匹配最优工厂: 深圳精密电子 (匹配度 98%)', 'success'));

    // --- Step 3: Asset Generation ---
    this.updateStep(task, 'step-3', 'processing');
    this.onUpdate(task, this.addLog(taskId, '正在从工厂端拉取原始生产视频素材...'));
    await this.delay(2000);
    this.updateStep(task, 'step-3', 'completed');
    this.onUpdate(task, this.addLog(taskId, '营销素材包生成完成 (包含 3 个原始生产视频)', 'success'));

    // --- Step 4: Loop Prediction ---
    this.updateStep(task, 'step-4', 'processing');
    this.onUpdate(task, this.addLog(taskId, '正在基于当前趋势预测 ROI 与资金回笼周期...'));
    await this.delay(2000);
    task.roiPrediction = {
      investment: 50000,
      projectedRevenue: 185000,
      paybackPeriod: '14 days'
    };
    this.updateStep(task, 'step-4', 'completed');
    task.overallStatus = 'completed';
    this.onUpdate(task, this.addLog(taskId, '全链路追踪任务完成，独家产能已锁定。', 'success'));
  }

  private updateStep(task: ViralTrendTask, stepId: string, status: AgentStep['status']) {
    const step = task.steps.find(s => s.id === stepId);
    if (step) {
      step.status = status;
      step.timestamp = new Date().toISOString();
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
