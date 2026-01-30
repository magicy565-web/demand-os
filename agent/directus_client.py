"""
Directus Client for Demand-OS Agent
负责与 Directus 后端的所有数据交互
"""

import os
import httpx
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

DIRECTUS_URL = os.getenv("DIRECTUS_URL", "http://localhost:8055")
DIRECTUS_TOKEN = os.getenv("DIRECTUS_TOKEN", "")


class DirectusClient:
    """异步 Directus API 客户端"""
    
    def __init__(self):
        self.base_url = DIRECTUS_URL
        self.headers = {
            "Authorization": f"Bearer {DIRECTUS_TOKEN}",
            "Content-Type": "application/json"
        }
    
    async def _request(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Optional[Dict]:
        """通用请求方法"""
        async with httpx.AsyncClient(timeout=30.0) as client:
            url = f"{self.base_url}{endpoint}"
            
            try:
                if method == "GET":
                    response = await client.get(url, headers=self.headers)
                elif method == "POST":
                    response = await client.post(url, headers=self.headers, json=data)
                elif method == "PATCH":
                    response = await client.patch(url, headers=self.headers, json=data)
                elif method == "DELETE":
                    response = await client.delete(url, headers=self.headers)
                else:
                    return None
                
                if response.status_code in [200, 201, 204]:
                    if response.status_code == 204:
                        return {"success": True}
                    return response.json()
                else:
                    print(f"❌ Directus Error [{response.status_code}]: {response.text}")
                    return None
                    
            except Exception as e:
                print(f"❌ Request Error: {str(e)}")
                return None


# ==================== Sourcing Requests ====================

async def create_sourcing_request(data: Dict[str, Any]) -> Optional[Dict]:
    """
    将 Discord 收到的询盘写入 Directus
    
    Args:
        data: {
            "platform": "TikTok" | "Discord",
            "user_id": str,
            "user_name": str,
            "video_url": str,
            "product_name": str,
            "visual_analysis": dict,
            "status": "draft" | "processing" | "quoted" | "completed",
            "quote_price_usd": float
        }
    """
    client = DirectusClient()
    result = await client._request("POST", "/items/sourcing_requests", data)
    
    if result and "data" in result:
        print(f"✅ 询盘已创建: #{result['data']['id']}")
        return result["data"]
    return None


async def update_sourcing_request(request_id: str, data: Dict[str, Any]) -> Optional[Dict]:
    """更新询盘状态或报价"""
    client = DirectusClient()
    result = await client._request("PATCH", f"/items/sourcing_requests/{request_id}", data)
    
    if result and "data" in result:
        return result["data"]
    return None


async def get_sourcing_request(request_id: str) -> Optional[Dict]:
    """获取单个询盘详情"""
    client = DirectusClient()
    result = await client._request("GET", f"/items/sourcing_requests/{request_id}")
    
    if result and "data" in result:
        return result["data"]
    return None


async def get_user_sourcing_history(user_id: str, limit: int = 10) -> List[Dict]:
    """获取用户的询盘历史"""
    client = DirectusClient()
    endpoint = f"/items/sourcing_requests?filter[user_id][_eq]={user_id}&limit={limit}&sort=-date_created"
    result = await client._request("GET", endpoint)
    
    if result and "data" in result:
        return result["data"]
    return []


# ==================== Factory Matching ====================

async def search_factory_match(keywords: str, category: Optional[str] = None) -> List[Dict]:
    """
    在 Directus 的 suppliers 集合中查找匹配工厂
    
    实际项目中可以：
    1. 使用 Directus 的全文搜索
    2. 调用外部 AI 语义匹配服务
    3. 查询预建的产品-工厂映射表
    """
    client = DirectusClient()
    
    # 构建查询条件
    filters = f"filter[status][_eq]=active"
    if category:
        filters += f"&filter[category][_contains]={category}"
    
    endpoint = f"/items/suppliers?{filters}&limit=5&sort=-rating"
    result = await client._request("GET", endpoint)
    
    if result and "data" in result:
        return result["data"]
    
    # 如果没有找到，返回模拟数据（演示用）
    return [
        {
            "id": "factory-001",
            "name": "宁波星辰智造",
            "name_en": "Ningbo Star Manufacturing",
            "category": "Home Appliances",
            "moq": 500,
            "rating": 4.8,
            "location": "浙江宁波",
            "certifications": ["ISO9001", "CE", "FCC"]
        },
        {
            "id": "factory-002", 
            "name": "深圳前沿科技",
            "name_en": "Shenzhen Frontier Tech",
            "category": "Electronics",
            "moq": 1000,
            "rating": 4.9,
            "location": "广东深圳",
            "certifications": ["ISO9001", "CE", "RoHS"]
        },
        {
            "id": "factory-003",
            "name": "东莞精工模具",
            "name_en": "Dongguan Precision Mold",
            "category": "Plastic Products",
            "moq": 300,
            "rating": 4.7,
            "location": "广东东莞",
            "certifications": ["ISO9001", "BSCI"]
        }
    ]


# ==================== Discord Integration ====================

async def create_discord_message(channel_id: str, data: Dict[str, Any]) -> Optional[Dict]:
    """
    存储 Discord 消息到 Directus（用于前端 Discord Clone 展示）
    
    Args:
        channel_id: 频道 ID
        data: {
            "user_id": str,
            "user_name": str,
            "content": str,
            "is_bot": bool,
            "embed_data": dict (可选，报价单结构)
        }
    """
    client = DirectusClient()
    
    message_data = {
        "channel_id": channel_id,
        **data
    }
    
    result = await client._request("POST", "/items/messages", message_data)
    
    if result and "data" in result:
        return result["data"]
    return None


async def get_channel_messages(channel_id: str, limit: int = 50) -> List[Dict]:
    """获取频道消息历史"""
    client = DirectusClient()
    endpoint = f"/items/messages?filter[channel_id][_eq]={channel_id}&limit={limit}&sort=-date_created"
    result = await client._request("GET", endpoint)
    
    if result and "data" in result:
        return result["data"]
    return []


# ==================== Analytics ====================

async def log_agent_action(action_type: str, metadata: Dict[str, Any]) -> None:
    """记录 Agent 行为日志（用于分析和优化）"""
    client = DirectusClient()
    
    log_data = {
        "action_type": action_type,  # e.g., "tiktok_analysis", "quote_generated", "factory_matched"
        "metadata": metadata
    }
    
    await client._request("POST", "/items/agent_logs", log_data)
