// intent-parser.ts - 意图解析器

import { allAgents } from '../agents';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.NOVA_AI_API_KEY || 'sk-LIs2MGKmDuGZhcfHbvLs1EiWHPwm2ELf3E8JkJXlFXgFLPBM',
  baseURL: process.env.OPENAI_BASE_URL || process.env.NOVA_AI_BASE_URL || 'https://once.novai.su/v1',
});

export async function parseIntent(prompt: string): Promise<string | null> {
  // 1. 快速路径：关键词匹配
  const lowerPrompt = prompt.toLowerCase();
  for (const agent of allAgents) {
    if (agent.triggers.some(trigger => lowerPrompt.includes(trigger.toLowerCase()))) {
      console.log(`[IntentParser] Matched agent by keywords: ${agent.id}`);
      return agent.id;
    }
  }

  // 2. 智能路径：LLM 意图识别
  const agentDescriptions = allAgents
    .map(a => `- ${a.id}: ${a.description}`)
    .join('\n');
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: `你是一个意图识别助手。根据用户的输入，从以下 Agent 中选择最合适的一个：\n\n${agentDescriptions}\n\n只返回 Agent ID，不要解释。如果没有合适的 Agent，返回 "null"。`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const agentId = response.choices[0]?.message?.content?.trim();
    
    if (agentId && agentId !== 'null' && allAgents.some(a => a.id === agentId)) {
      console.log(`[IntentParser] Matched agent by LLM: ${agentId}`);
      return agentId;
    }
  } catch (error) {
    console.error('[IntentParser] LLM intent recognition failed:', error);
  }

  console.log('[IntentParser] No matching agent found');
  return null;
}
