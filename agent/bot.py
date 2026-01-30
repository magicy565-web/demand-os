"""
Demand-OS Discord Bot - 主入口
TikTok 产品识别 + 智能报价 + 工厂匹配
"""

import discord
import os
import asyncio
import re
from datetime import datetime
from dotenv import load_dotenv

from directus_client import (
    create_sourcing_request, 
    search_factory_match,
    get_user_sourcing_history,
    create_discord_message
)
from tiktok_hunter import analyze_tiktok_video, calculate_price

# 加载环境变量
load_dotenv()

# 配置
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")
TIKTOK_CHANNEL_ID = os.getenv("TIKTOK_HUNTER_CHANNEL_ID")

# Discord 客户端设置
intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
intents.members = True

client = discord.Client(intents=intents)


# ==================== 核心工作流 ====================

async def process_tiktok_sourcing(message: discord.Message, url: str):
    """
    处理 TikTok 链接的核心工作流
    
    流程：
    1. 下载视频关键帧
    2. GPT-4o 视觉分析
    3. 匹配园区工厂
    4. 生成报价单
    5. 存入 Directus
    """
    
    # 初始状态消息
    status_embed = discord.Embed(
        title="🔄 Demand-OS 正在处理您的请求...",
        color=0x5865F2,  # Discord Blurple
        description="请稍候，AI 引擎正在分析视频内容"
    )
    status_embed.add_field(name="📹 视频下载", value="⏳ 进行中...", inline=True)
    status_embed.add_field(name="🤖 AI 分析", value="⏳ 等待中...", inline=True)
    status_embed.add_field(name="🏭 工厂匹配", value="⏳ 等待中...", inline=True)
    
    status_msg = await message.reply(embed=status_embed)
    
    try:
        # ===== Step 1: 视频分析 =====
        await asyncio.sleep(1)  # 模拟下载
        
        status_embed.set_field_at(0, name="📹 视频下载", value="✅ 完成", inline=True)
        status_embed.set_field_at(1, name="🤖 AI 分析", value="⏳ 进行中...", inline=True)
        await status_msg.edit(embed=status_embed)
        
        # 调用 TikTok Hunter
        analysis = await analyze_tiktok_video(url)
        
        if not analysis.get("success", False):
            await send_error_message(message, "视频分析失败", analysis.get("error", "未知错误"))
            return
        
        status_embed.set_field_at(1, name="🤖 AI 分析", value="✅ 完成", inline=True)
        status_embed.set_field_at(2, name="🏭 工厂匹配", value="⏳ 进行中...", inline=True)
        await status_msg.edit(embed=status_embed)
        
        # ===== Step 2: 工厂匹配 =====
        factories = await search_factory_match(
            keywords=analysis.get("product_name", ""),
            category=analysis.get("category", "")
        )
        
        status_embed.set_field_at(2, name="🏭 工厂匹配", value=f"✅ 找到 {len(factories)} 家", inline=True)
        status_embed.title = "✅ 分析完成！"
        status_embed.color = 0x23A559  # Discord Green
        await status_msg.edit(embed=status_embed)
        
        # ===== Step 3: 计算报价 =====
        price_info = calculate_price(
            category=analysis.get("category", "default"),
            complexity="medium",
            quantity=1000
        )
        
        # ===== Step 4: 存入 Directus =====
        record = await create_sourcing_request({
            "platform": "TikTok",
            "user_id": str(message.author.id),
            "user_name": message.author.name,
            "video_url": url,
            "product_name": analysis.get("product_name", "Unknown"),
            "visual_analysis": analysis,
            "status": "quoted",
            "quote_price_usd": price_info["unit_price_usd"]
        })
        
        request_id = record["id"] if record else "N/A"
        
        # ===== Step 5: 生成报价单卡片 =====
        await send_quote_card(message, analysis, price_info, factories, request_id)
        
        # 记录到 Discord 消息存储（用于前端展示）
        await create_discord_message(
            channel_id=str(message.channel.id),
            data={
                "user_id": str(message.author.id),
                "user_name": message.author.name,
                "content": f"TikTok Sourcing: {url}",
                "is_bot": False
            }
        )
        
    except Exception as e:
        print(f"❌ 处理失败: {str(e)}")
        await send_error_message(message, "处理过程中出错", str(e))


async def send_quote_card(
    message: discord.Message, 
    analysis: dict, 
    price_info: dict, 
    factories: list,
    request_id: str
):
    """发送精美的报价单卡片"""
    
    # 主报价单 Embed
    quote_embed = discord.Embed(
        title=f"⚡ 极速报价单 | Instant Quote",
        color=0x23A559,
        timestamp=datetime.now()
    )
    
    # 产品信息
    quote_embed.add_field(
        name="📦 识别产品",
        value=f"**{analysis.get('product_name', 'Unknown')}**",
        inline=False
    )
    
    # 产品特征
    features = analysis.get("features", [])
    if features:
        features_text = "\n".join([f"• {f}" for f in features[:5]])
        quote_embed.add_field(
            name="✨ 产品特征",
            value=features_text,
            inline=False
        )
    
    # 价格信息
    quote_embed.add_field(
        name="💰 参考 FOB 价",
        value=f"**${price_info['unit_price_usd']}** / unit",
        inline=True
    )
    
    quote_embed.add_field(
        name="📊 起订量",
        value="MOQ 1,000 pcs",
        inline=True
    )
    
    quote_embed.add_field(
        name="🚚 交期",
        value=f"{price_info.get('lead_time_days', 20)} 天",
        inline=True
    )
    
    # 成本分解
    breakdown = price_info.get("breakdown", {})
    cost_text = f"""
```
材料成本: ${breakdown.get('material', 0):.2f}
人工成本: ${breakdown.get('labor', 0):.2f}
管理费用: ${breakdown.get('overhead', 0):.2f}
───────────────
单位成本: ${price_info['unit_price_usd']:.2f}
```
"""
    quote_embed.add_field(
        name="📋 成本分解",
        value=cost_text,
        inline=False
    )
    
    # 匹配工厂
    if factories:
        factory_lines = []
        for i, f in enumerate(factories[:3], 1):
            stars = "⭐" * int(f.get("rating", 4))
            factory_lines.append(
                f"{i}. **{f.get('name', 'Factory')}** {stars}\n"
                f"   📍 {f.get('location', 'China')} | MOQ: {f.get('moq', 500)}"
            )
        
        quote_embed.add_field(
            name=f"🏭 匹配工厂 ({len(factories)} 家认证供应商)",
            value="\n".join(factory_lines),
            inline=False
        )
    
    # 置信度
    confidence = analysis.get("confidence", 0.8)
    confidence_bar = "🟢" * int(confidence * 10) + "⚪" * (10 - int(confidence * 10))
    quote_embed.add_field(
        name="🎯 AI 置信度",
        value=f"{confidence_bar} {int(confidence * 100)}%",
        inline=False
    )
    
    # 询盘 ID
    quote_embed.set_footer(
        text=f"询盘 ID: #{request_id} | Powered by Demand-OS 工业绿洲"
    )
    
    # 采购建议
    advice = analysis.get("sourcing_advice", "")
    if advice:
        quote_embed.add_field(
            name="💡 采购建议",
            value=advice,
            inline=False
        )
    
    # 缩略图
    quote_embed.set_thumbnail(url="https://via.placeholder.com/100x100/23A559/FFFFFF?text=✓")
    
    # 发送主卡片
    await message.channel.send(embed=quote_embed)
    
    # 发送操作按钮提示
    action_embed = discord.Embed(
        color=0x5865F2,
        description="**下一步操作：**\n"
                    "📋 `/quote details` - 查看完整报价单\n"
                    "🏭 `/factory list` - 查看所有匹配工厂\n"
                    "📧 `/contact factory` - 直接联系工厂\n"
                    "📥 `/export pdf` - 导出 PDF 报价单"
    )
    await message.channel.send(embed=action_embed)


async def send_error_message(message: discord.Message, title: str, error: str):
    """发送错误消息"""
    error_embed = discord.Embed(
        title=f"❌ {title}",
        color=0xDA373C,
        description=f"```\n{error}\n```"
    )
    error_embed.set_footer(text="请检查链接是否正确，或联系管理员")
    await message.reply(embed=error_embed)


# ==================== 命令处理 ====================

async def handle_help_command(message: discord.Message):
    """处理帮助命令"""
    help_embed = discord.Embed(
        title="🤖 Demand-OS Bot 使用指南",
        color=0x5865F2,
        description="我是您的智能采购助手，可以帮您快速找到优质供应商！"
    )
    
    help_embed.add_field(
        name="📹 TikTok 产品识别",
        value="直接发送 TikTok 链接，AI 会自动识别产品并生成报价",
        inline=False
    )
    
    help_embed.add_field(
        name="🔍 搜索产品",
        value="`!search [产品关键词]` - 在供应商数据库中搜索",
        inline=False
    )
    
    help_embed.add_field(
        name="📊 查看历史",
        value="`!history` - 查看您的询盘历史",
        inline=False
    )
    
    help_embed.add_field(
        name="💬 获取帮助",
        value="`!help` - 显示此帮助信息",
        inline=False
    )
    
    help_embed.set_footer(text="Powered by Demand-OS | 工业绿洲")
    
    await message.reply(embed=help_embed)


async def handle_history_command(message: discord.Message):
    """处理历史命令"""
    history = await get_user_sourcing_history(str(message.author.id), limit=5)
    
    if not history:
        await message.reply("📭 您还没有询盘记录。发送 TikTok 链接开始第一次询价吧！")
        return
    
    history_embed = discord.Embed(
        title="📋 您的询盘历史",
        color=0x5865F2
    )
    
    for i, item in enumerate(history, 1):
        history_embed.add_field(
            name=f"{i}. {item.get('product_name', 'Unknown')}",
            value=f"💰 ${item.get('quote_price_usd', 'N/A')} | 状态: {item.get('status', 'N/A')}",
            inline=False
        )
    
    await message.reply(embed=history_embed)


# ==================== 事件处理 ====================

@client.event
async def on_ready():
    """Bot 启动完成"""
    print(f"""
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🚀 Demand-OS Agent 已上线                                  ║
║   Bot: {client.user}                              ║
║   Servers: {len(client.guilds)}                                               ║
║                                                              ║
║   Ready to process TikTok sourcing requests!                 ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
""")
    
    # 设置 Bot 状态
    await client.change_presence(
        activity=discord.Activity(
            type=discord.ActivityType.watching,
            name="TikTok for products 🔍"
        )
    )


@client.event
async def on_message(message: discord.Message):
    """消息处理"""
    
    # 忽略自己的消息
    if message.author == client.user:
        return
    
    # 忽略其他 Bot 的消息
    if message.author.bot:
        return
    
    content = message.content.strip()
    
    # ===== TikTok 链接检测 =====
    tiktok_patterns = [
        r'https?://(?:www\.)?tiktok\.com/@[\w.-]+/video/\d+',
        r'https?://(?:vm|vt)\.tiktok\.com/[\w]+',
        r'https?://(?:www\.)?tiktok\.com/t/[\w]+'
    ]
    
    for pattern in tiktok_patterns:
        match = re.search(pattern, content)
        if match:
            await process_tiktok_sourcing(message, match.group())
            return
    
    # ===== 命令处理 =====
    if content.lower() in ['!help', '!帮助', '/help']:
        await handle_help_command(message)
        return
    
    if content.lower() in ['!history', '!历史', '/history']:
        await handle_history_command(message)
        return
    
    # ===== 搜索命令 =====
    if content.lower().startswith('!search ') or content.lower().startswith('/search '):
        query = content.split(' ', 1)[1] if len(content.split(' ')) > 1 else ""
        if query:
            factories = await search_factory_match(query)
            if factories:
                search_embed = discord.Embed(
                    title=f"🔍 搜索结果: {query}",
                    color=0x5865F2
                )
                for f in factories[:5]:
                    search_embed.add_field(
                        name=f.get("name", "Factory"),
                        value=f"📍 {f.get('location', 'China')} | ⭐ {f.get('rating', 'N/A')} | MOQ: {f.get('moq', 'N/A')}",
                        inline=False
                    )
                await message.reply(embed=search_embed)
            else:
                await message.reply("😔 未找到匹配的供应商，请尝试其他关键词")
        return


@client.event
async def on_guild_join(guild: discord.Guild):
    """加入新服务器时"""
    print(f"✅ 已加入服务器: {guild.name} (ID: {guild.id})")
    
    # 尝试在第一个文字频道发送欢迎消息
    for channel in guild.text_channels:
        if channel.permissions_for(guild.me).send_messages:
            welcome_embed = discord.Embed(
                title="👋 感谢邀请 Demand-OS Bot！",
                color=0x23A559,
                description="我是您的智能采购助手，可以帮您：\n\n"
                            "📹 **识别 TikTok 产品** - 发送视频链接即可获得 AI 分析\n"
                            "💰 **快速报价** - 秒级生成 FOB 参考价\n"
                            "🏭 **匹配工厂** - 连接认证供应商\n\n"
                            "输入 `!help` 查看完整使用指南"
            )
            await channel.send(embed=welcome_embed)
            break


# ==================== 启动 ====================

if __name__ == "__main__":
    if not DISCORD_TOKEN:
        print("❌ 错误: 未设置 DISCORD_TOKEN 环境变量")
        print("请在 agent/.env 文件中配置您的 Discord Bot Token")
        exit(1)
    
    print("🔄 正在启动 Demand-OS Agent...")
    client.run(DISCORD_TOKEN)
