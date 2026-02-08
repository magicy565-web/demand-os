import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-LIs2MGKmDuGZhcfHbvLs1EiWHPwm2ELf3E8JkJXlFXgFLPBM',
  baseURL: process.env.OPENAI_BASE_URL || 'https://once.novai.su/v1',
});

// 节点类型定义
const NODE_TYPES_DESCRIPTION = `
- **type**: \`input\`
  - **description**: The starting point of the workflow. Represents user input.
  - **config**: \`{ "inputKey": "unique_key_name" }\`

- **type**: \`ai\`
  - **description**: Calls an AI model for analysis, generation, or decision making.
  - **config**: \`{ "model": "gpt-4.1-mini", "prompt": "Your detailed prompt here. You can use {{node_id.output}} to reference outputs from other nodes." }\`

- **type**: \`datasource\`
  - **description**: Queries data from a database or an external API.
  - **config**: \`{ "source": "directus" | "tiktok_api" | "customs_data", "query": "Your query here. You can use {{node_id.output}}." }\`

- **type**: \`condition\`
  - **description**: Performs a logical branch. The workflow will follow different paths based on the result.
  - **config**: \`{ "condition": "{{node_id.output}} > 100" }\`

- **type**: \`transform\`
  - **description**: Processes or formats data.
  - **config**: \`{ "transformation": "convert_to_uppercase" | "extract_email" }\`

- **type**: \`output\`
  - **description**: The end point of the workflow. Represents the final result.
  - **config**: \`{}\`
`;

// Master Prompt 模板
function buildMasterPrompt(userPrompt: string): string {
  return `# Role: AI Workflow Generation Expert

## Context:
You are an expert in building AI agent workflows for the e-commerce and manufacturing industry in China. Your task is to convert a user's natural language request into a structured JSON object that represents a visual workflow. This JSON will be used to render a graph in a React Flow application.

## Available Node Types:
Here is a list of the nodes you can use. You MUST only use these node types.

${NODE_TYPES_DESCRIPTION}

## Output JSON Schema:
You MUST output a single, valid JSON object that adheres to the following \`AgentWorkflow\` TypeScript interface. Do not add any extra explanations or text outside of the JSON object.

\`\`\`typescript
interface AgentWorkflow {
  id: string; // A unique ID for the workflow (e.g., "workflow-1234567890")
  name: string; // A concise name for the workflow (in Chinese)
  description: string; // A brief description of what the workflow does (in Chinese)
  category: string; // e.g., "海外寻源", "工厂委托开发", "市场分析"
  icon?: string; // Optional emoji icon
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

interface WorkflowNode {
  id: string; // A unique ID for the node (e.g., "input-1", "ai-1")
  type: 'input' | 'datasource' | 'ai' | 'condition' | 'transform' | 'output';
  label: string; // A short, descriptive label for the node (in Chinese)
  config: any; // Configuration object based on the node type
  position: { x: number; y: number }; // Position on the canvas. Arrange nodes from left to right with 200px horizontal spacing.
}

interface WorkflowEdge {
  id: string; // A unique ID for the edge (e.g., "e1-2")
  source: string; // The ID of the source node
  target: string; // The ID of the target node
  label?: string; // Optional label for the edge
}
\`\`\`

## Important Instructions:
1. All text content (name, description, labels) MUST be in **Chinese**.
2. Arrange nodes from **left to right** with approximately 200px horizontal spacing between nodes.
3. Start the first node at position (100, 100).
4. If there are multiple parallel branches, arrange them vertically with 150px vertical spacing.
5. The workflow MUST start with an \`input\` node and end with an \`output\` node.
6. Use realistic and specific configurations for each node based on the user's request.

## User Request:
"${userPrompt}"

## Your JSON Output (output ONLY the JSON, no other text):`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, sessionId } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt. Please provide a non-empty string.' },
        { status: 400 }
      );
    }

    // 构建 Master Prompt
    const masterPrompt = buildMasterPrompt(prompt);

    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini', // 使用环境变量中配置的模型
      messages: [
        {
          role: 'system',
          content: 'You are an AI workflow generation expert. You always output valid JSON and nothing else.',
        },
        {
          role: 'user',
          content: masterPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content?.trim();

    if (!responseText) {
      throw new Error('Empty response from AI model.');
    }

    // 尝试解析 JSON
    let workflowData;
    try {
      // 移除可能的 Markdown 代码块标记
      const cleanedText = responseText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();
      
      workflowData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', responseText);
      return NextResponse.json(
        {
          error: 'AI returned invalid JSON. Please try again.',
          rawResponse: responseText,
        },
        { status: 500 }
      );
    }

    // 验证必要字段
    if (!workflowData.id || !workflowData.nodes || !workflowData.edges) {
      return NextResponse.json(
        {
          error: 'Generated workflow is missing required fields (id, nodes, edges).',
          data: workflowData,
        },
        { status: 500 }
      );
    }

    // 返回生成的工作流
    return NextResponse.json(workflowData, { status: 200 });
  } catch (error: any) {
    console.error('Error in generate-from-text API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error.',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
