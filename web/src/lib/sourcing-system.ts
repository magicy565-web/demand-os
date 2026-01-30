/**
 * 寻源工单系统 (Sourcing Request System)
 * 当库内无匹配产品时，自动创建人工辅助工单
 */

import { SourcingRequest, SourcingQuote, StructuredQuery, SourcingStatus } from "@/types/auto-request";

/**
 * 内存数据库（生产环境应使用 Directus 或真实数据库）
 */
let SOURCING_REQUESTS: SourcingRequest[] = [];
let SOURCING_QUOTES: SourcingQuote[] = [];

/**
 * 生成工单 ID
 */
function generateTicketId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RFQ-${dateStr}-${randomStr}`;
}

/**
 * 创建寻源工单
 */
export async function createSourcingRequest(
  query: StructuredQuery,
  userId: string = "guest",
  userName?: string
): Promise<SourcingRequest> {
  const ticket: SourcingRequest = {
    id: generateTicketId(),
    user_id: userId,
    user_name: userName || "匿名用户",
    original_query: query.original_query,
    parsed_requirements: query,
    status: "pending",
    priority: determinePriority(query),
    created_at: new Date(),
    updated_at: new Date(),
    assigned_to: assignToProcurementAgent(query),
    estimated_response_time: 2, // 2小时默认响应时间
    quotes: [],
  };

  // 保存到"数据库"
  SOURCING_REQUESTS.push(ticket);

  // 在实际生产中，这里应该：
  // 1. 写入 Directus 数据库
  // 2. 发送通知给采购员（邮件/Slack/微信）
  // 3. 触发 Webhook 通知管理后台

  console.log(`[Sourcing System] 新工单已创建: ${ticket.id}`);
  console.log(`[Sourcing System] 分配给: ${ticket.assigned_to}`);
  console.log(`[Sourcing System] 预计响应时间: ${ticket.estimated_response_time}小时`);

  return ticket;
}

/**
 * 确定工单优先级
 */
function determinePriority(query: StructuredQuery): "high" | "medium" | "low" {
  // 高优先级条件：
  // 1. 价格预算高（>$50）
  // 2. MOQ 大（>10000）
  // 3. 明确提到紧急/urgent

  const highValueOrder = query.target_price?.max && query.target_price.max > 50;
  const largeOrder = query.moq?.min && query.moq.min > 10000;
  const urgentKeywords = query.original_query.toLowerCase().match(/紧急|urgent|asap|rush/);

  if (urgentKeywords || highValueOrder || largeOrder) {
    return "high";
  }

  // 中优先级：有明确价格和 MOQ
  if (query.target_price && query.moq) {
    return "medium";
  }

  return "low";
}

/**
 * 分配给采购员（智能路由）
 */
function assignToProcurementAgent(query: StructuredQuery): string {
  // 根据类别分配给不同的产业带采购员
  const categoryAgentMap: Record<string, string> = {
    "Consumer Electronics": "深圳电子产业带采购员",
    "Apparel": "广州服装产业带采购员",
    "Home & Garden": "义乌小商品采购员",
    "Medical Devices": "苏州医疗器械采购员",
  };

  return query.category
    ? categoryAgentMap[query.category] || "综合采购团队"
    : "综合采购团队";
}

/**
 * 获取工单详情
 */
export async function getSourcingRequest(ticketId: string): Promise<SourcingRequest | null> {
  return SOURCING_REQUESTS.find(req => req.id === ticketId) || null;
}

/**
 * 更新工单状态
 */
export async function updateSourcingRequestStatus(
  ticketId: string,
  status: SourcingStatus
): Promise<void> {
  const request = SOURCING_REQUESTS.find(req => req.id === ticketId);
  if (request) {
    request.status = status;
    request.updated_at = new Date();
  }
}

/**
 * 为工单添加报价
 */
export async function addQuoteToRequest(
  ticketId: string,
  quote: Omit<SourcingQuote, "id" | "request_id" | "created_at">
): Promise<SourcingQuote> {
  const newQuote: SourcingQuote = {
    id: `Q-${Date.now()}`,
    request_id: ticketId,
    ...quote,
    created_at: new Date(),
  };

  SOURCING_QUOTES.push(newQuote);

  // 更新工单
  const request = SOURCING_REQUESTS.find(req => req.id === ticketId);
  if (request) {
    request.quotes = request.quotes || [];
    request.quotes.push(newQuote);
    request.status = "quoted";
    request.updated_at = new Date();
  }

  return newQuote;
}

/**
 * 获取用户的所有工单
 */
export async function getUserSourcingRequests(userId: string): Promise<SourcingRequest[]> {
  return SOURCING_REQUESTS.filter(req => req.user_id === userId);
}

/**
 * 获取所有待处理工单（管理员视图）
 */
export async function getPendingSourcingRequests(): Promise<SourcingRequest[]> {
  return SOURCING_REQUESTS.filter(req => req.status === "pending" || req.status === "processing");
}

/**
 * 模拟人工报价（用于演示）
 */
export async function simulateManualQuote(ticketId: string): Promise<void> {
  // 模拟采购员在2小时后添加报价
  setTimeout(async () => {
    await addQuoteToRequest(ticketId, {
      supplier_name: "深圳优质供应商 A",
      product_name: "定制款智能产品",
      fob_price: 14.5,
      moq: 500,
      delivery_time: "18-22天",
      sample_available: true,
      sample_price: 30,
      notes: "支持定制 LOGO，提供 3D 样品图",
      created_by: "深圳电子产业带采购员",
    });

    await addQuoteToRequest(ticketId, {
      supplier_name: "东莞认证工厂 B",
      product_name: "品牌同款替代品",
      fob_price: 13.8,
      moq: 1000,
      delivery_time: "20-25天",
      sample_available: true,
      sample_price: 25,
      notes: "CE/FCC 认证齐全，支持 OEM",
      created_by: "深圳电子产业带采购员",
    });

    console.log(`[Sourcing System] 工单 ${ticketId} 已收到 2 份报价`);
  }, 5000); // 5秒后模拟报价（演示用，实际是2小时）
}

/**
 * 清空所有工单（测试用）
 */
export function clearAllSourcingRequests(): void {
  SOURCING_REQUESTS = [];
  SOURCING_QUOTES = [];
}
