/**
 * 工作流模板定义
 * 定义了对话式执行引擎中的所有工作流模板
 */

export type StepType = 'user_input' | 'system_action' | 'end';

export interface WorkflowStep {
  id: string;
  type: StepType;
  message: string | ((context: any) => string); // 支持模板函数
  inputKey?: string; // user_input 步骤需要
  action?: (context: any) => Promise<any>; // system_action 步骤需要
  transitions: {
    target: string;
    condition?: (context: any) => boolean;
  }[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  initialStep: string;
  steps: Record<string, WorkflowStep>;
}

// ===== 海外寻源工作流 =====
export const overseasSourcingWorkflow: WorkflowTemplate = {
  id: 'overseas-sourcing',
  name: '海外寻源',
  description: '分析海外电商平台的爆款产品，并匹配国内工厂',
  icon: '🌏',
  initialStep: 'step1_prompt_for_url',
  steps: {
    step1_prompt_for_url: {
      id: 'step1_prompt_for_url',
      type: 'user_input',
      message: '您好！我是 Demand-OS 海外寻源助手。\n\n请提供您想分析的 TikTok 视频链接，我将为您分析其市场潜力并匹配合适的工厂。',
      inputKey: 'tiktok_url',
      transitions: [{ target: 'step2_analyze_video' }],
    },
    step2_analyze_video: {
      id: 'step2_analyze_video',
      type: 'system_action',
      message: '正在分析视频内容和市场潜力...',
      action: async (context) => {
        // 模拟 AI 分析视频
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
          analysisResult: {
            productName: '便携式蓝牙音箱',
            category: '电子产品',
            rating: '高',
            estimatedDemand: '10,000+ 件/月',
            targetMarket: '北美',
          },
        };
      },
      transitions: [{ target: 'step3_show_analysis_result' }],
    },
    step3_show_analysis_result: {
      id: 'step3_show_analysis_result',
      type: 'user_input',
      message: (context) => {
        const result = context.analysisResult;
        return `✅ 分析完成！\n\n**产品信息**\n- 产品名称: ${result.productName}\n- 类别: ${result.category}\n- 市场潜力: ${result.rating}\n- 预估需求: ${result.estimatedDemand}\n- 目标市场: ${result.targetMarket}\n\n是否继续为您匹配合适的工厂？（输入"是"或"否"）`;
      },
      inputKey: 'confirm_factory_matching',
      transitions: [
        {
          target: 'step4_match_factories',
          condition: (ctx) => ctx.confirm_factory_matching?.toLowerCase() === '是',
        },
        {
          target: 'end_cancelled',
          condition: (ctx) => ctx.confirm_factory_matching?.toLowerCase() === '否',
        },
        { target: 'step3_show_analysis_result' }, // 默认重新询问
      ],
    },
    step4_match_factories: {
      id: 'step4_match_factories',
      type: 'system_action',
      message: '正在为您匹配合适的工厂...',
      action: async (context) => {
        // 模拟工厂匹配
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
          factories: [
            { name: '深圳市创新电子有限公司', location: '深圳', rating: 4.8 },
            { name: '东莞市精工制造厂', location: '东莞', rating: 4.6 },
            { name: '广州市智能科技公司', location: '广州', rating: 4.5 },
          ],
        };
      },
      transitions: [{ target: 'step5_show_factories' }],
    },
    step5_show_factories: {
      id: 'step5_show_factories',
      type: 'user_input',
      message: (context) => {
        const factories = context.factories;
        let msg = '✅ 已为您找到 3 家合适的工厂：\n\n';
        factories.forEach((f: any, i: number) => {
          msg += `${i + 1}. **${f.name}**\n   - 位置: ${f.location}\n   - 评分: ${f.rating}/5.0\n\n`;
        });
        msg += '您可以输入工厂编号（1-3）查看详情，或输入"完成"结束对话。';
        return msg;
      },
      inputKey: 'factory_selection',
      transitions: [
        {
          target: 'end_completed',
          condition: (ctx) => ctx.factory_selection?.toLowerCase() === '完成',
        },
        { target: 'step5_show_factories' }, // 默认重新展示
      ],
    },
    end_completed: {
      id: 'end_completed',
      type: 'end',
      message: '感谢使用 Demand-OS 海外寻源服务！如有其他需求，请随时联系我们。',
      transitions: [],
    },
    end_cancelled: {
      id: 'end_cancelled',
      type: 'end',
      message: '已取消操作。感谢使用 Demand-OS！',
      transitions: [],
    },
  },
};

// ===== 工厂委托开发工作流 =====
export const factoryODMWorkflow: WorkflowTemplate = {
  id: 'factory-odm',
  name: '工厂委托开发',
  description: '根据产品需求，评估工厂的开发能力和成本',
  icon: '🏭',
  initialStep: 'step1_prompt_for_product',
  steps: {
    step1_prompt_for_product: {
      id: 'step1_prompt_for_product',
      type: 'user_input',
      message: '您好！我是 Demand-OS 工厂委托开发助手。\n\n请描述您想开发的产品（例如：智能手表、蓝牙耳机等）。',
      inputKey: 'product_description',
      transitions: [{ target: 'step2_analyze_requirements' }],
    },
    step2_analyze_requirements: {
      id: 'step2_analyze_requirements',
      type: 'system_action',
      message: '正在分析产品需求和技术要求...',
      action: async (context) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
          requirements: {
            complexity: '中等',
            estimatedCost: '¥50,000 - ¥100,000',
            developmentTime: '3-6 个月',
          },
        };
      },
      transitions: [{ target: 'end_completed' }],
    },
    end_completed: {
      id: 'end_completed',
      type: 'end',
      message: (context) => {
        const req = context.requirements;
        return `✅ 分析完成！\n\n**开发需求评估**\n- 复杂度: ${req.complexity}\n- 预估成本: ${req.estimatedCost}\n- 开发周期: ${req.developmentTime}\n\n感谢使用 Demand-OS！`;
      },
      transitions: [],
    },
  },
};

// ===== 导出所有工作流模板 =====
export const allWorkflowTemplates: WorkflowTemplate[] = [
  overseasSourcingWorkflow,
  factoryODMWorkflow,
];

export function getWorkflowTemplate(id: string): WorkflowTemplate | undefined {
  return allWorkflowTemplates.find((t) => t.id === id);
}
