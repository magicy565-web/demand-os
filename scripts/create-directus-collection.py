#!/usr/bin/env python3
"""
Directus Collection 自动创建脚本
用于创建 conversations collection 及其所有字段
"""

import json
import sys
import time
from urllib.request import Request, urlopen, HTTPError
from urllib.parse import urlencode

class DirectusAPI:
    def __init__(self, base_url="https://admin.cnsubscribe.xyz", email="magic@gmail.com", password="wysk1214"):
        self.base_url = base_url
        self.email = email
        self.password = password
        self.token = None
        self.admin_token = None
    
    def login(self):
        """登录获取token"""
        print("\n[1/4] 登录Directus...")
        url = f"{self.base_url}/auth/login"
        data = json.dumps({"email": self.email, "password": self.password}).encode()
        req = Request(url, data=data, headers={"Content-Type": "application/json"})
        
        try:
            with urlopen(req, timeout=10) as response:
                result = json.loads(response.read())
                self.token = result.get('data', {}).get('access_token')
                if self.token:
                    print(f"✅ 登录成功")
                    print(f"   Token: {self.token[:30]}...")
                    return True
                else:
                    print("❌ 登录失败: 没有获取到token")
                    return False
        except Exception as e:
            print(f"❌ 登录失败: {e}")
            return False
    
    def api_call(self, method, endpoint, data=None):
        """调用Directus API"""
        url = f"{self.base_url}{endpoint}"
        
        if data:
            data = json.dumps(data).encode()
        
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }
        
        req = Request(url, data=data, headers=headers, method=method)
        
        try:
            with urlopen(req, timeout=10) as response:
                return json.loads(response.read())
        except HTTPError as e:
            error = e.read().decode()
            print(f"   ❌ API错误 ({e.code}): {error[:200]}")
            return None
        except Exception as e:
            print(f"   ❌ 错误: {e}")
            return None
    
    def create_collection(self):
        """创建conversations collection"""
        print("\n[2/4] 创建conversations collection...")
        
        collection_data = {
            "collection": "conversations",
            "meta": {
                "collection": "conversations",
                "icon": "chat",
                "note": "用户对话历史记录",
                "display_template": "{{product_name}}"
            },
            "schema": {
                "name": "conversations",
                "comment": "Conversations table"
            }
        }
        
        result = self.api_call("POST", "/collections", collection_data)
        
        if result:
            print(f"✅ Collection创建成功")
            return True
        else:
            print(f"❌ Collection创建失败")
            return False
    
    def add_field(self, field_name, field_config):
        """添加字段"""
        field_data = {
            "field": field_name,
            "type": field_config["type"],
            "meta": field_config.get("meta", {})
        }
        
        if "schema" in field_config:
            field_data["schema"] = field_config["schema"]
        
        result = self.api_call(
            "POST",
            f"/fields/conversations",
            field_data
        )
        
        return result is not None
    
    def create_fields(self):
        """创建所有字段"""
        print("\n[3/4] 创建字段...")
        
        fields = {
            "user_id": {
                "type": "string",
                "meta": {
                    "field": "user_id",
                    "hidden": False,
                    "required": True
                },
                "schema": {
                    "name": "user_id",
                    "table": "conversations",
                    "type": "varchar",
                    "default_value": None,
                    "max_length": 255,
                    "nullable": False,
                    "indexed": True
                }
            },
            "tiktok_url": {
                "type": "string",
                "meta": {
                    "field": "tiktok_url",
                    "hidden": False,
                    "required": False
                },
                "schema": {
                    "name": "tiktok_url",
                    "table": "conversations",
                    "type": "varchar",
                    "max_length": 500,
                    "nullable": True
                }
            },
            "product_name": {
                "type": "string",
                "meta": {
                    "field": "product_name",
                    "hidden": False,
                    "required": True
                },
                "schema": {
                    "name": "product_name",
                    "table": "conversations",
                    "type": "varchar",
                    "max_length": 255,
                    "nullable": False
                }
            },
            "category": {
                "type": "string",
                "meta": {
                    "field": "category",
                    "hidden": False,
                    "required": True
                },
                "schema": {
                    "name": "category",
                    "table": "conversations",
                    "type": "varchar",
                    "max_length": 100,
                    "nullable": False
                }
            },
            "trend_score": {
                "type": "integer",
                "meta": {
                    "field": "trend_score",
                    "hidden": False,
                    "required": False
                },
                "schema": {
                    "name": "trend_score",
                    "table": "conversations",
                    "type": "integer",
                    "nullable": True
                }
            },
            "lifecycle": {
                "type": "string",
                "meta": {
                    "field": "lifecycle",
                    "hidden": False,
                    "required": False,
                    "options": [
                        {"text": "Emerging", "value": "emerging"},
                        {"text": "Growth", "value": "growth"},
                        {"text": "Mature", "value": "mature"},
                        {"text": "Decline", "value": "decline"}
                    ]
                },
                "schema": {
                    "name": "lifecycle",
                    "table": "conversations",
                    "type": "varchar",
                    "max_length": 50,
                    "default_value": "emerging",
                    "nullable": True
                }
            },
            "result": {
                "type": "json",
                "meta": {
                    "field": "result",
                    "hidden": False,
                    "required": False
                },
                "schema": {
                    "name": "result",
                    "table": "conversations",
                    "type": "json",
                    "nullable": True
                }
            },
            "notes": {
                "type": "text",
                "meta": {
                    "field": "notes",
                    "hidden": False,
                    "required": False
                },
                "schema": {
                    "name": "notes",
                    "table": "conversations",
                    "type": "text",
                    "nullable": True
                }
            },
            "status": {
                "type": "string",
                "meta": {
                    "field": "status",
                    "hidden": False,
                    "required": False,
                    "options": [
                        {"text": "Draft", "value": "draft"},
                        {"text": "Published", "value": "published"},
                        {"text": "Archived", "value": "archived"}
                    ]
                },
                "schema": {
                    "name": "status",
                    "table": "conversations",
                    "type": "varchar",
                    "max_length": 50,
                    "default_value": "published",
                    "nullable": True
                }
            }
        }
        
        success_count = 0
        for field_name, field_config in fields.items():
            if self.add_field(field_name, field_config):
                print(f"  ✅ {field_name}")
                success_count += 1
                time.sleep(0.5)  # 避免API限流
            else:
                print(f"  ❌ {field_name}")
        
        print(f"\n✅ {success_count}/{len(fields)} 字段创建成功")
        return success_count == len(fields)
    
    def configure_permissions(self):
        """配置权限"""
        print("\n[4/4] 配置权限...")
        
        # 这部分比较复杂，可能需要管理员token
        # 暂时跳过，用户可以手动配置
        print("⚠️  权限配置需要在管理后台手动进行:")
        print("   1. Settings → Roles & Permissions")
        print("   2. 选择你的角色")
        print("   3. 为 conversations 启用 Read/Create/Update/Delete")
        print("   4. 保存")
        
        return True
    
    def run(self):
        """执行完整流程"""
        print("=" * 60)
        print("Directus Collection 自动创建脚本")
        print("=" * 60)
        
        if not self.login():
            return False
        
        if not self.create_collection():
            return False
        
        if not self.create_fields():
            return False
        
        if not self.configure_permissions():
            return False
        
        print("\n" + "=" * 60)
        print("✅ Collection创建流程完成!")
        print("=" * 60)
        print("\n下一步:")
        print("1. 在Directus后台手动配置权限")
        print("2. 运行验证命令:")
        print("   python test-directus-api.py")
        
        return True

if __name__ == "__main__":
    api = DirectusAPI()
    success = api.run()
    sys.exit(0 if success else 1)
