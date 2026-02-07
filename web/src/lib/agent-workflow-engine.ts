/**
 * Agent 工作流引擎
 * 对标 Accio 的核心执行引擎
 */

export interface WorkflowNode {
  id: string;
  type: 'input' | 'datasource' | 'ai' | 'condition' | 'transform' | 'output';
  label: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  variables?: Record<string, any>;
}

export interface ExecutionContext {
  workflowId: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  nodeResults: Map<string, any>;
  logs: ExecutionLog[];
}

export interface ExecutionLog {
  timestamp: Date;
  nodeId: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
}

/**
 * Agent 工作流执行引擎
 */
export class AgentWorkflowEngine {
  private workflow: AgentWorkflow;
  private context: ExecutionContext;
  private nodeHandlers: Map<string, NodeHandler>;

  constructor(workflow: AgentWorkflow) {
    this.workflow = workflow;
    this.context = {
      workflowId: workflow.id,
      inputs: {},
      outputs: {},
      nodeResults: new Map(),
      logs: [],
    };
    this.nodeHandlers = new Map();
    this.registerDefaultHandlers();
  }

  /**
   * 注册默认节点处理器
   */
  private registerDefaultHandlers() {
    this.registerNodeHandler('input', new InputNodeHandler());
    this.registerNodeHandler('datasource', new DatasourceNodeHandler());
    this.registerNodeHandler('ai', new AINodeHandler());
    this.registerNodeHandler('condition', new ConditionNodeHandler());
    this.registerNodeHandler('transform', new TransformNodeHandler());
    this.registerNodeHandler('output', new OutputNodeHandler());
  }

  /**
   * 注册自定义节点处理器
   */
  registerNodeHandler(type: string, handler: NodeHandler) {
    this.nodeHandlers.set(type, handler);
  }

  /**
   * 执行工作流
   */
  async execute(inputs: Record<string, any>): Promise<ExecutionResult> {
    this.context.inputs = inputs;
    this.log('info', 'workflow_start', `开始执行工作流: ${this.workflow.name}`);

    try {
      // 1. 构建执行图
      const executionGraph = this.buildExecutionGraph();

      // 2. 拓扑排序
      const executionOrder = this.topologicalSort(executionGraph);

      // 3. 按顺序执行节点
      for (const nodeId of executionOrder) {
        await this.executeNode(nodeId);
      }

      // 4. 收集输出
      const outputs = this.collectOutputs();

      this.log('info', 'workflow_complete', '工作流执行完成');

      return {
        success: true,
        outputs,
        logs: this.context.logs,
      };
    } catch (error: any) {
      this.log('error', 'workflow_error', `工作流执行失败: ${error.message}`);
      return {
        success: false,
        error: error.message,
        logs: this.context.logs,
      };
    }
  }

  /**
   * 执行单个节点
   */
  private async executeNode(nodeId: string): Promise<void> {
    const node = this.workflow.nodes.find((n) => n.id === nodeId);
    if (!node) {
      throw new Error(`节点不存在: ${nodeId}`);
    }

    this.log('info', nodeId, `执行节点: ${node.label}`);

    const handler = this.nodeHandlers.get(node.type);
    if (!handler) {
      throw new Error(`未找到节点处理器: ${node.type}`);
    }

    try {
      // 获取输入数据
      const inputs = this.getNodeInputs(nodeId);

      // 执行节点
      const result = await handler.execute(node, inputs, this.context);

      // 保存结果
      this.context.nodeResults.set(nodeId, result);

      this.log('info', nodeId, `节点执行成功`, result);
    } catch (error: any) {
      this.log('error', nodeId, `节点执行失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 获取节点的输入数据
   */
  private getNodeInputs(nodeId: string): Record<string, any> {
    const incomingEdges = this.workflow.edges.filter((e) => e.target === nodeId);
    const inputs: Record<string, any> = {};

    for (const edge of incomingEdges) {
      const sourceResult = this.context.nodeResults.get(edge.source);
      if (sourceResult !== undefined) {
        inputs[edge.source] = sourceResult;
      }
    }

    return inputs;
  }

  /**
   * 构建执行图
   */
  private buildExecutionGraph(): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    for (const node of this.workflow.nodes) {
      graph.set(node.id, []);
    }

    for (const edge of this.workflow.edges) {
      const neighbors = graph.get(edge.source) || [];
      neighbors.push(edge.target);
      graph.set(edge.source, neighbors);
    }

    return graph;
  }

  /**
   * 拓扑排序
   */
  private topologicalSort(graph: Map<string, string[]>): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const neighbors = graph.get(nodeId) || [];
      for (const neighbor of neighbors) {
        visit(neighbor);
      }

      result.unshift(nodeId);
    };

    for (const nodeId of graph.keys()) {
      visit(nodeId);
    }

    return result;
  }

  /**
   * 收集输出节点的结果
   */
  private collectOutputs(): Record<string, any> {
    const outputs: Record<string, any> = {};

    for (const node of this.workflow.nodes) {
      if (node.type === 'output') {
        const result = this.context.nodeResults.get(node.id);
        if (result !== undefined) {
          outputs[node.id] = result;
        }
      }
    }

    return outputs;
  }

  /**
   * 记录日志
   */
  private log(level: 'info' | 'warn' | 'error', nodeId: string, message: string, data?: any) {
    this.context.logs.push({
      timestamp: new Date(),
      nodeId,
      level,
      message,
      data,
    });
  }
}

/**
 * 节点处理器接口
 */
export interface NodeHandler {
  execute(node: WorkflowNode, inputs: Record<string, any>, context: ExecutionContext): Promise<any>;
}

/**
 * 输入节点处理器
 */
class InputNodeHandler implements NodeHandler {
  async execute(node: WorkflowNode, inputs: Record<string, any>, context: ExecutionContext): Promise<any> {
    const inputKey = node.config.inputKey || 'default';
    return context.inputs[inputKey];
  }
}

/**
 * 数据源节点处理器
 */
class DatasourceNodeHandler implements NodeHandler {
  async execute(node: WorkflowNode, inputs: Record<string, any>, context: ExecutionContext): Promise<any> {
    const { datasource, query } = node.config;

    // TODO: 实现数据源查询逻辑
    // 根据 datasource 类型调用不同的 API
    // 例如：Directus、TikTok、海关数据等

    return {
      datasource,
      query,
      results: [],
    };
  }
}

/**
 * AI 节点处理器
 */
class AINodeHandler implements NodeHandler {
  async execute(node: WorkflowNode, inputs: Record<string, any>, context: ExecutionContext): Promise<any> {
    const { prompt, model } = node.config;

    // TODO: 调用 AI API
    // 例如：Nova AI、OpenAI 等

    return {
      model,
      prompt,
      response: 'AI 分析结果',
    };
  }
}

/**
 * 条件节点处理器
 */
class ConditionNodeHandler implements NodeHandler {
  async execute(node: WorkflowNode, inputs: Record<string, any>, context: ExecutionContext): Promise<any> {
    const { condition } = node.config;

    // TODO: 评估条件表达式
    const result = true; // 简化示例

    return result;
  }
}

/**
 * 转换节点处理器
 */
class TransformNodeHandler implements NodeHandler {
  async execute(node: WorkflowNode, inputs: Record<string, any>, context: ExecutionContext): Promise<any> {
    const { transformation } = node.config;

    // TODO: 执行数据转换
    // 例如：映射、过滤、聚合等

    return inputs;
  }
}

/**
 * 输出节点处理器
 */
class OutputNodeHandler implements NodeHandler {
  async execute(node: WorkflowNode, inputs: Record<string, any>, context: ExecutionContext): Promise<any> {
    const inputValues = Object.values(inputs);
    return inputValues.length > 0 ? inputValues[0] : null;
  }
}

/**
 * 执行结果
 */
export interface ExecutionResult {
  success: boolean;
  outputs?: Record<string, any>;
  error?: string;
  logs: ExecutionLog[];
}
