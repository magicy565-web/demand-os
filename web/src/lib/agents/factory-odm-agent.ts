// factory-odm-agent.ts - 工厂委托开发 Agent

import { Agent, Step, StepResult } from './types';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.NOVA_AI_API_KEY || 'sk-LIs2MGKmDuGZhcfHbvLs1EiWHPwm2ELf3E8JkJXlFXgFLPBM',
  baseURL: process.env.OPENAI_BASE_URL || process.env.NOVA_AI_BASE_URL || 'https://once.novai.su/v1',
});

export const factoryODMAgent: Agent = {
  id: 'factory-odm-agent',
  name: '工厂委托开发助手',
  description: '评估产品生产产能需求，匹配合适的工厂，并生成委托开发方案。',
  triggers: ['工厂', '委托开发', '生产', '产能', 'ODM', '工厂资质'],
  
  planner: async (prompt: string, context: any): Promise<Step[]> => {
    // 工厂委托开发的固定流程
    return [
      {
        id: 'step1_collect_info',
        name: '收集产品信息',
        description: '需要您提供产品的基本信息',
        icon: '📝',
        type: 'user_input',
        action: collectProductInfo,
        status: 'pending',
        log: [],
      },
      {
        id: 'step2_analyze_market',
        name: '市场分析',
        description: 'AI 正在分析市场潜力和采购商匹配度',
        icon: '📊',
        type: 'system_action',
        action: analyzeMarket,
        status: 'pending',
        log: [],
      },
      {
        id: 'step3_define_strategy',
        name: '定义合作策略',
        description: '请确认合作策略',
        icon: '🎯',
        type: 'user_input',
        action: defineStrategy,
        status: 'pending',
        log: [],
      },
      {
        id: 'step4_qualify_factory',
        name: '工厂资质审核',
        description: '请提供工厂的详细资质信息',
        icon: '🏭',
        type: 'user_input',
        action: qualifyFactory,
        status: 'pending',
        log: [],
      },
      {
        id: 'step5_submit_application',
        name: '提交申请',
        description: '正在提交您的申请并进行审核',
        icon: '✅',
        type: 'system_action',
        action: submitApplication,
        status: 'pending',
        log: [],
      },
    ];
  },
};

// Step 1: 收集产品信息
async function collectProductInfo(context: any): Promise<StepResult> {
  // 这是一个 user_input 类型的步骤，需要前端渲染表单
  return {
    success: true,
    componentType: 'form',
    componentProps: {
      fields: [
        { name: 'productName', label: '产品名称', type: 'text', required: true },
        { name: 'productDetails', label: '产品详情', type: 'textarea', required: true },
        { name: 'targetMarket', label: '目标市场', type: 'text', required: true },
        { name: 'companyName', label: '公司名称', type: 'text', required: true },
        { name: 'contactPerson', label: '联系人', type: 'text', required: true },
        { name: 'contactPhone', label: '联系电话', type: 'text', required: true },
      ],
    },
  };
}

// Step 2: 市场分析
async function analyzeMarket(context: any): Promise<StepResult> {
  const { productName } = context;
  
  if (!productName) {
    return {
      success: false,
      error: '缺少产品名称',
    };
  }

  const systemPrompt = `
    You are a world-class market analyst AI for a global trade company.
    Your goal is to identify high-quality potential buyers for a given product.
    You must generate a response in JSON format, adhering strictly to the following structure:
    {
      "potentialBuyers": {
        "total": <A number representing the total estimated buyers in the global market>,
        "bestMatch": {
          "name": "<The buyer's full name>",
          "companyMasked": "<The company name, with parts masked for privacy (e.g., 'A*** B.V.')>",
          "location": "<City, Country>",
          "productScope": "<A concise summary of the products they are interested in>",
          "factoryPreference": "<The preferred type of factory (e.g., 'OEM/ODM, Verified Supplier')>",
          "qualifications": ["<List of required certifications>", "<e.g., ISO 9001>", "<e.g., CE Certified>"],
          "lastOrderSize": "<Estimated size of their recent orders (e.g., '$500,000 - $1M')>",
          "joinDate": "<The year they joined the platform (e.g., '2018')>",
          "matchScore": <A number between 90 and 98>
        },
        "top10": [
          {
            "id": "<A unique identifier, e.g., 'BUYER-001'>",
            "name": "<The buyer's full name, masked for privacy (e.g., 'J*** S***')>",
            "location": "<City>",
            "country": "<Country>"
          }
        ]
      }
    }
    Do not include any text, notes, or explanations outside of the JSON structure.
    The data should be realistic, diverse, and tailored to the product.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Product: "${productName}"` },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('AI 返回内容为空');
    }

    const cleanedContent = content.replace(/^```json\n|\n```$/g, '');
    const analysisData = JSON.parse(cleanedContent);

    return {
      success: true,
      data: analysisData,
      componentType: 'analysis',
      componentProps: {
        analysisData,
        region: context.targetMarket || 'Global',
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: `市场分析失败: ${error.message}`,
    };
  }
}

// Step 3: 定义合作策略
async function defineStrategy(context: any): Promise<StepResult> {
  // 这是一个 user_input 类型的步骤，需要前端渲染策略确认组件
  return {
    success: true,
    componentType: 'strategy',
    componentProps: {},
  };
}

// Step 4: 工厂资质审核
async function qualifyFactory(context: any): Promise<StepResult> {
  // 这是一个 user_input 类型的步骤，需要前端渲染工厂资质表单
  return {
    success: true,
    componentType: 'deal',
    componentProps: {
      initialFormData: {
        productName: context.productName,
        companyName: context.companyName,
        contactPerson: context.contactPerson,
        contactPhone: context.contactPhone,
      },
    },
  };
}

// Step 5: 提交申请
async function submitApplication(context: any): Promise<StepResult> {
  // 这里应该调用真实的后端 API 提交申请
  // 暂时模拟成功
  
  try {
    // TODO: 实际的 API 调用
    // const response = await fetch('/api/submit-application', { ... });
    
    return {
      success: true,
      data: {
        applicationId: `APP-${Date.now()}`,
        status: 'submitted',
        message: '您的申请已成功提交，我们将在 1-2 个工作日内完成审核。',
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: `提交申请失败: ${error.message}`,
    };
  }
}
