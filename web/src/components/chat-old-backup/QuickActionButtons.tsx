'use client';

/**
 * QuickActionButtons - 快捷操作按钮
 * 引导用户完成多轮对话
 */

import { Button } from '@/components/ui/button';
import { useChatStore } from '@/lib/chat/chat-store';

interface QuickAction {
  id: string;
  label: string;
  action: string;
  icon?: string;
}

interface QuickActionButtonsProps {
  actions: QuickAction[];
}

export function QuickActionButtons({ actions }: QuickActionButtonsProps) {
  const { addMessage } = useChatStore();

  const handleActionClick = (action: QuickAction) => {
    // 添加用户消息
    addMessage({
      role: 'user',
      type: 'text',
      content: action.label,
    });

    // 根据 action 类型生成 Agent 回复
    let reply = '';
    switch (action.action) {
      case 'view_factories':
        reply = '好的！这里是匹配工厂的详细信息：\n\n每家工厂都经过园区认证，具有完整的生产资质和出口经验。你可以：\n\n1️⃣ 查看工厂生产线照片\n2️⃣ 了解认证资质（ISO, CE, FCC等）\n3️⃣ 查看历史合作案例\n4️⃣ 直接联系工厂负责人\n\n需要我帮你联系哪家工厂？';
        break;
      case 'get_sample':
        reply = '样品报价方案：\n\n📦 **样品套餐**\n• 1 件样品：$15.00（含国际快递）\n• 3 件样品：$38.00（节省 $7）\n• 5 件样品：$60.00（节省 $15）\n\n🚚 **发货时效**\n• 生产时间：3-5 天\n• 国际快递：5-7 天\n• 总计：8-12 天到达\n\n需要我帮你下单样品吗？';
        break;
      case 'calculate_bulk':
        reply = '不同数量的价格对比：\n\n| 数量 | 单价 | 总价 | 节省 |\n|------|------|------|------|\n| 500 件 | $3.80 | $1,900 | - |\n| 1,000 件 | $3.20 | $3,200 | $600 |\n| 5,000 件 | $2.85 | $14,250 | $4,750 |\n| 10,000 件 | $2.50 | $25,000 | $13,000 |\n\n💡 **建议**：首次合作建议订购 1,000 件测试市场，如果销售良好再追加订单可享受更低价格。\n\n需要我生成正式报价单吗？';
        break;
      case 'logistics':
        reply = '物流方案对比：\n\n🚢 **传统 FOB**\n• 价格：$3.20/件\n• 你需要：自己找货代、报关、清关\n• 适合：有物流经验的买家\n\n✈️ **DDP 到美国**\n• 价格：$4.80/件（含运费+关税）\n• 我们负责：门到门全包服务\n• 适合：新手卖家，省心省力\n\n🚚 **3PL 仓储**\n• 价格：$5.20/件（含运费+仓储）\n• 服务：直接发到亚马逊 FBA 或你的 3PL 仓库\n• 适合：亚马逊卖家\n\n你倾向于哪种方案？';
        break;
      case 'analyze':
        reply = '好的！请发送 TikTok 产品链接，我会帮你分析：\n\n📹 产品特征识别\n📊 趋势分数评估\n🏭 工厂匹配推荐\n💰 实时报价生成';
        break;
      case 'find_factory':
        reply = '我可以帮你找工厂！请告诉我：\n\n1️⃣ 产品类别（如：电子产品、服装、家居用品）\n2️⃣ 目标市场（美国、欧洲、日本等）\n3️⃣ 需求量级（dropshipping / 批发 / 独家）\n\n或者直接发送产品图片/链接也可以！';
        break;
      case 'calculate_price':
        reply = '我可以生成实时报价！支持三种模式：\n\n1️⃣ **Dropshipping**（一件代发）\n2️⃣ **Wholesale**（批发）\n3️⃣ **Exclusive**（独家供应）\n\n请发送产品链接或告诉我产品名称。';
        break;
      default:
        reply = '收到！我会帮你处理这个请求。';
    }

    // 延迟添加 Agent 回复，模拟真实对话
    setTimeout(() => {
      addMessage({
        role: 'agent',
        type: 'text',
        content: reply,
      });
    }, 500);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          onClick={() => handleActionClick(action)}
          className="text-sm hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
