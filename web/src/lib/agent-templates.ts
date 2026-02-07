/**
 * Agent 模板库
 * 预置常用的 Agent 工作流模板
 */

import { AgentWorkflow } from './agent-workflow-engine';

/**
 * 海外寻源 Agent
 */
export const overseasSourcingAgent: AgentWorkflow = {
  id: 'overseas-sourcing',
  name: '海外寻源 Agent',
  description: '分析海外市场需求（TikTok 爆款），匹配国内工厂，生成采购方案',
  category: '海外寻源',
  icon: '🌍',
  nodes: [
    {
      id: 'input-1',
      type: 'input',
      label: '用户输入',
      config: { inputKey: 'tiktokUrl' },
      position: { x: 100, y: 100 },
    },
    {
      id: 'datasource-1',
      type: 'datasource',
      label: 'TikTok 视频分析',
      config: {
        datasource: 'tiktok',
        query: { action: 'analyze_video' },
      },
      position: { x: 300, y: 100 },
    },
    {
      id: 'ai-1',
      type: 'ai',
      label: '产品特征提取',
      config: {
        model: 'nova-ai',
        prompt: '分析产品特征、类别、目标市场',
      },
      position: { x: 500, y: 100 },
    },
    {
      id: 'datasource-2',
      type: 'datasource',
      label: '工厂数据查询',
      config: {
        datasource: 'directus',
        collection: 'factories',
      },
      position: { x: 700, y: 100 },
    },
    {
      id: 'ai-2',
      type: 'ai',
      label: '工厂智能匹配',
      config: {
        model: 'nova-ai',
        prompt: '根据产品特征匹配最合适的工厂',
      },
      position: { x: 900, y: 100 },
    },
    {
      id: 'output-1',
      type: 'output',
      label: '采购方案',
      config: { format: 'report' },
      position: { x: 1100, y: 100 },
    },
  ],
  edges: [
    { id: 'e1', source: 'input-1', target: 'datasource-1' },
    { id: 'e2', source: 'datasource-1', target: 'ai-1' },
    { id: 'e3', source: 'ai-1', target: 'datasource-2' },
    { id: 'e4', source: 'datasource-2', target: 'ai-2' },
    { id: 'e5', source: 'ai-2', target: 'output-1' },
  ],
};

/**
 * 工厂委托开发 Agent
 */
export const factoryODMAgent: AgentWorkflow = {
  id: 'factory-odm',
  name: '工厂委托开发 Agent',
  description: '基于产品需求，匹配工厂，评估开发周期和成本',
  category: '委托开发',
  icon: '🏭',
  nodes: [
    {
      id: 'input-1',
      type: 'input',
      label: '产品需求',
      config: { inputKey: 'productRequirement' },
      position: { x: 100, y: 100 },
    },
    {
      id: 'ai-1',
      type: 'ai',
      label: '需求分析',
      config: {
        model: 'nova-ai',
        prompt: '分析产品规格、技术要求、质量标准',
      },
      position: { x: 300, y: 100 },
    },
    {
      id: 'datasource-1',
      type: 'datasource',
      label: '工厂能力查询',
      config: {
        datasource: 'directus',
        collection: 'factories',
        filter: { capabilities: 'odm' },
      },
      position: { x: 500, y: 100 },
    },
    {
      id: 'ai-2',
      type: 'ai',
      label: '工厂评估',
      config: {
        model: 'nova-ai',
        prompt: '评估工厂的开发能力、质量控制、交付能力',
      },
      position: { x: 700, y: 100 },
    },
    {
      id: 'transform-1',
      type: 'transform',
      label: '成本估算',
      config: {
        transformation: 'calculate_cost',
      },
      position: { x: 900, y: 100 },
    },
    {
      id: 'output-1',
      type: 'output',
      label: '开发方案',
      config: { format: 'detailed_report' },
      position: { x: 1100, y: 100 },
    },
  ],
  edges: [
    { id: 'e1', source: 'input-1', target: 'ai-1' },
    { id: 'e2', source: 'ai-1', target: 'datasource-1' },
    { id: 'e3', source: 'datasource-1', target: 'ai-2' },
    { id: 'e4', source: 'ai-2', target: 'transform-1' },
    { id: 'e5', source: 'transform-1', target: 'output-1' },
  ],
};

/**
 * 产能分析 Agent
 */
export const capacityAnalysisAgent: AgentWorkflow = {
  id: 'capacity-analysis',
  name: '产能分析 Agent',
  description: '分析工厂产能利用率，预测可用产能',
  category: '产能管理',
  icon: '📊',
  nodes: [
    {
      id: 'input-1',
      type: 'input',
      label: '查询参数',
      config: { inputKey: 'queryParams' },
      position: { x: 100, y: 100 },
    },
    {
      id: 'datasource-1',
      type: 'datasource',
      label: '工厂数据',
      config: {
        datasource: 'directus',
        collection: 'factories',
      },
      position: { x: 300, y: 100 },
    },
    {
      id: 'datasource-2',
      type: 'datasource',
      label: '订单数据',
      config: {
        datasource: 'directus',
        collection: 'orders',
      },
      position: { x: 300, y: 250 },
    },
    {
      id: 'transform-1',
      type: 'transform',
      label: '产能计算',
      config: {
        transformation: 'calculate_capacity',
      },
      position: { x: 500, y: 175 },
    },
    {
      id: 'ai-1',
      type: 'ai',
      label: '趋势预测',
      config: {
        model: 'nova-ai',
        prompt: '预测未来产能需求和可用性',
      },
      position: { x: 700, y: 175 },
    },
    {
      id: 'output-1',
      type: 'output',
      label: '产能报告',
      config: { format: 'dashboard' },
      position: { x: 900, y: 175 },
    },
  ],
  edges: [
    { id: 'e1', source: 'input-1', target: 'datasource-1' },
    { id: 'e2', source: 'input-1', target: 'datasource-2' },
    { id: 'e3', source: 'datasource-1', target: 'transform-1' },
    { id: 'e4', source: 'datasource-2', target: 'transform-1' },
    { id: 'e5', source: 'transform-1', target: 'ai-1' },
    { id: 'e6', source: 'ai-1', target: 'output-1' },
  ],
};

/**
 * 订单匹配 Agent
 */
export const orderMatchingAgent: AgentWorkflow = {
  id: 'order-matching',
  name: '订单匹配 Agent',
  description: '根据订单需求，智能分配工厂，优化产能利用',
  category: '订单管理',
  icon: '📦',
  nodes: [
    {
      id: 'input-1',
      type: 'input',
      label: '订单需求',
      config: { inputKey: 'orderRequirement' },
      position: { x: 100, y: 100 },
    },
    {
      id: 'ai-1',
      type: 'ai',
      label: '需求解析',
      config: {
        model: 'nova-ai',
        prompt: '解析订单的产品类别、数量、交付时间等',
      },
      position: { x: 300, y: 100 },
    },
    {
      id: 'datasource-1',
      type: 'datasource',
      label: '可用工厂查询',
      config: {
        datasource: 'directus',
        collection: 'factories',
        filter: { status: 'available' },
      },
      position: { x: 500, y: 100 },
    },
    {
      id: 'ai-2',
      type: 'ai',
      label: '智能匹配',
      config: {
        model: 'nova-ai',
        prompt: '综合考虑产能、价格、质量、交付时间，推荐最优工厂',
      },
      position: { x: 700, y: 100 },
    },
    {
      id: 'condition-1',
      type: 'condition',
      label: '产能检查',
      config: {
        condition: 'capacity >= required',
      },
      position: { x: 900, y: 100 },
    },
    {
      id: 'output-1',
      type: 'output',
      label: '分配方案',
      config: { format: 'allocation_plan' },
      position: { x: 1100, y: 100 },
    },
  ],
  edges: [
    { id: 'e1', source: 'input-1', target: 'ai-1' },
    { id: 'e2', source: 'ai-1', target: 'datasource-1' },
    { id: 'e3', source: 'datasource-1', target: 'ai-2' },
    { id: 'e4', source: 'ai-2', target: 'condition-1' },
    { id: 'e5', source: 'condition-1', target: 'output-1', label: '通过' },
  ],
};

/**
 * 市场趋势分析 Agent
 */
export const marketTrendAgent: AgentWorkflow = {
  id: 'market-trend',
  name: '市场趋势分析 Agent',
  description: '分析市场趋势，预测爆款产品，提供采购建议',
  category: '市场分析',
  icon: '📈',
  nodes: [
    {
      id: 'input-1',
      type: 'input',
      label: '分析参数',
      config: { inputKey: 'analysisParams' },
      position: { x: 100, y: 100 },
    },
    {
      id: 'datasource-1',
      type: 'datasource',
      label: 'TikTok 趋势',
      config: {
        datasource: 'tiktok',
        query: { action: 'trending_products' },
      },
      position: { x: 300, y: 50 },
    },
    {
      id: 'datasource-2',
      type: 'datasource',
      label: '海关数据',
      config: {
        datasource: 'customs',
        query: { action: 'export_trends' },
      },
      position: { x: 300, y: 150 },
    },
    {
      id: 'datasource-3',
      type: 'datasource',
      label: '市场数据库',
      config: {
        datasource: 'market_db',
        collection: 'trends',
      },
      position: { x: 300, y: 250 },
    },
    {
      id: 'transform-1',
      type: 'transform',
      label: '数据聚合',
      config: {
        transformation: 'aggregate_trends',
      },
      position: { x: 500, y: 150 },
    },
    {
      id: 'ai-1',
      type: 'ai',
      label: '趋势预测',
      config: {
        model: 'nova-ai',
        prompt: '综合分析市场趋势，预测未来爆款',
      },
      position: { x: 700, y: 150 },
    },
    {
      id: 'output-1',
      type: 'output',
      label: '趋势报告',
      config: { format: 'trend_report' },
      position: { x: 900, y: 150 },
    },
  ],
  edges: [
    { id: 'e1', source: 'input-1', target: 'datasource-1' },
    { id: 'e2', source: 'input-1', target: 'datasource-2' },
    { id: 'e3', source: 'input-1', target: 'datasource-3' },
    { id: 'e4', source: 'datasource-1', target: 'transform-1' },
    { id: 'e5', source: 'datasource-2', target: 'transform-1' },
    { id: 'e6', source: 'datasource-3', target: 'transform-1' },
    { id: 'e7', source: 'transform-1', target: 'ai-1' },
    { id: 'e8', source: 'ai-1', target: 'output-1' },
  ],
};

/**
 * 所有预置模板
 */
export const agentTemplates: AgentWorkflow[] = [
  overseasSourcingAgent,
  factoryODMAgent,
  capacityAnalysisAgent,
  orderMatchingAgent,
  marketTrendAgent,
];

/**
 * 根据 ID 获取模板
 */
export function getTemplateById(id: string): AgentWorkflow | undefined {
  return agentTemplates.find((template) => template.id === id);
}

/**
 * 根据类别获取模板
 */
export function getTemplatesByCategory(category: string): AgentWorkflow[] {
  return agentTemplates.filter((template) => template.category === category);
}

/**
 * 获取所有类别
 */
export function getAllCategories(): string[] {
  const categories = new Set(agentTemplates.map((t) => t.category));
  return Array.from(categories);
}
