// agents/index.ts - Agent 注册和管理

import { Agent } from './types';
import { factoryODMAgent } from './factory-odm-agent';

// 所有可用的 Agent
export const allAgents: Agent[] = [
  factoryODMAgent,
];

// 根据 ID 获取 Agent
export function getAgent(agentId: string): Agent | null {
  return allAgents.find(agent => agent.id === agentId) || null;
}

// 根据关键词匹配 Agent
export function matchAgentByKeywords(text: string): Agent | null {
  const lowerText = text.toLowerCase();
  for (const agent of allAgents) {
    if (agent.triggers.some(trigger => lowerText.includes(trigger.toLowerCase()))) {
      return agent;
    }
  }
  return null;
}
