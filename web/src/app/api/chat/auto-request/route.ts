/**
 * Auto Request Chat API Route
 * 处理用户的模糊采购指令，返回产品匹配或创建人工工单
 */

import { NextRequest, NextResponse } from "next/server";
import { parseUserQuery, isQueryValid } from "@/lib/ai-parser";
import { searchProducts } from "@/lib/product-search";
import { createSourcingRequest, simulateManualQuote } from "@/lib/sourcing-system";
import { AutoRequestResponse } from "@/types/auto-request";

/**
 * 匹配分数阈值配置
 */
const MATCH_THRESHOLD = {
  HIGH: 70, // 高置信度匹配
  MEDIUM: 50, // 中等匹配
};

/**
 * POST /api/chat/auto-request
 * 处理用户的采购指令
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, userId = "guest", userName } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    // ============ Step 1: AI 解析用户输入 ============
    console.log("[Auto Request] 开始解析用户输入:", message);
    const structuredQuery = await parseUserQuery(message);

    // 验证解析结果
    if (!isQueryValid(structuredQuery)) {
      const errorResponse: AutoRequestResponse = {
        type: "parsing_error",
        data: {
          error: "抱歉，我没有完全理解您的需求。能否提供更多细节？例如：产品类型、价格范围、起订量等。",
          original_query: message,
        },
      };
      return NextResponse.json(errorResponse);
    }

    console.log("[Auto Request] 解析结果:", structuredQuery);

    // ============ Step 2: 搜索库内产品 ============
    console.log("[Auto Request] 开始搜索产品库...");
    const matches = await searchProducts(structuredQuery);

    console.log(`[Auto Request] 找到 ${matches.length} 个匹配产品`);

    // ============ Step 3: 决策逻辑 ============
    
    // 情况 1: 找到高质量匹配（分数 >= 70）
    if (matches.length > 0 && matches[0].match_score >= MATCH_THRESHOLD.HIGH) {
      console.log("[Auto Request] 命中高质量匹配，返回产品列表");
      
      const successResponse: AutoRequestResponse = {
        type: "product_match",
        data: {
          matches: matches.slice(0, 5), // 最多返回5个
          total: matches.length,
          query: structuredQuery,
        },
      };

      return NextResponse.json(successResponse);
    }

    // 情况 2: 找到中等匹配（分数 50-70）
    if (matches.length > 0 && matches[0].match_score >= MATCH_THRESHOLD.MEDIUM) {
      console.log("[Auto Request] 找到中等匹配，但同时创建工单以获取更多选项");
      
      // 同时返回现有匹配 + 创建工单
      const ticket = await createSourcingRequest(structuredQuery, userId, userName);
      
      // 触发模拟人工报价（演示用）
      simulateManualQuote(ticket.id);

      const mixedResponse: AutoRequestResponse = {
        type: "product_match",
        data: {
          matches: matches.slice(0, 3),
          total: matches.length,
          query: structuredQuery,
        },
      };

      return NextResponse.json({
        ...mixedResponse,
        meta: {
          ticket_created: true,
          ticket_id: ticket.id,
          message: `同时为您创建了寻源工单 #${ticket.id}，采购员将提供更多选项`,
        },
      });
    }

    // 情况 3: 无匹配或低质量匹配 -> 触发 Beta 功能
    console.log("[Auto Request] 库内无匹配，触发 Auto Request Beta 功能");
    
    const ticket = await createSourcingRequest(structuredQuery, userId, userName);
    
    // 触发模拟人工报价
    simulateManualQuote(ticket.id);

    const escalateResponse: AutoRequestResponse = {
      type: "auto_request_triggered",
      data: {
        ticket_id: ticket.id,
        ticket: ticket,
        message: generateEscalationMessage(ticket, structuredQuery),
        estimated_time: ticket.estimated_response_time || 2,
      },
    };

    return NextResponse.json(escalateResponse);

  } catch (error) {
    console.error("[Auto Request] Error:", error);
    
    return NextResponse.json(
      {
        type: "parsing_error",
        data: {
          error: "系统处理出错，请稍后重试",
          original_query: "",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * 生成人工介入提示消息
 */
function generateEscalationMessage(ticket: any, query: any): string {
  const category = query.category || "相关品类";
  const priceInfo = query.target_price?.max
    ? `$${query.target_price.max} 以内`
    : "您要求的价格范围";

  return `🔍 在我们的核心产品库中未找到完全匹配 "${priceInfo}${category}"。

✨ **Beta 服务已触发**：
• 工单编号: #${ticket.id}
• 分配给: ${ticket.assigned_to}
• 优先级: ${ticket.priority === "high" ? "⚡ 高优先级" : "📋 标准处理"}

系统已自动生成寻源工单，并派发给 **${ticket.assigned_to}** 的驻场采购员。

⏱️ 预计 **${ticket.estimated_response_time} 小时内** 为您推送 **3 份精准报价**。

采购员将基于您的需求：
• 联系 5+ 家认证工厂
• 获取实时 FOB 报价
• 确认 MOQ 和交期
• 提供样品方案

您可以继续浏览其他产品，我们会在有新报价时通知您 📬`;
}

/**
 * GET /api/chat/auto-request
 * 健康检查
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0.0-beta",
    features: ["AI Parsing", "Product Search", "Auto Escalation"],
  });
}
