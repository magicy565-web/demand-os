#!/usr/bin/env python3
"""
Directus Collections 完整设置脚本
直接使用API创建/更新所有Collections及其字段
"""

import json
import sys
import time
from urllib.request import Request, urlopen, HTTPError
from urllib.parse import quote

class DirectusSetup:
    def __init__(self, base_url="https://admin.cnsubscribe.xyz", email="magic@gmail.com", password="wysk1214"):
        self.base_url = base_url
        self.email = email
        self.password = password
        self.token = None
    
    def log(self, level, message):
        """打印日志"""
        icons = {
            'step': '📍',
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        }
        print(f"{icons.get(level, '•')} {message}")
    
    def login(self):
        """登录获取管理员token"""
        self.log('step', f"[1/5] 使用管理员账号登录: {self.email}")
        
        url = f"{self.base_url}/auth/login"
        data = json.dumps({"email": self.email, "password": self.password}).encode()
        req = Request(url, data=data, headers={"Content-Type": "application/json"})
        
        try:
            with urlopen(req, timeout=10) as response:
                result = json.loads(response.read())
                self.token = result.get('data', {}).get('access_token')
                if self.token:
                    self.log('success', f"登录成功")
                    return True
                else:
                    self.log('error', "没有获取到token")
                    return False
        except Exception as e:
            self.log('error', f"登录失败: {e}")
            return False
    
    def api_call(self, method, endpoint, data=None, return_error=False):
        """调用Directus API"""
        url = f"{self.base_url}{endpoint}"
        
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }
        
        request_data = None
        if data:
            request_data = json.dumps(data).encode()
        
        req = Request(url, data=request_data, headers=headers, method=method)
        
        try:
            with urlopen(req, timeout=10) as response:
                return json.loads(response.read())
        except HTTPError as e:
            error_body = e.read().decode()
            if return_error:
                return {"error": True, "status": e.code, "body": error_body}
            self.log('error', f"API错误 ({e.code}): {error_body[:200]}")
            return None
        except Exception as e:
            self.log('error', f"请求失败: {e}")
            return None
        
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }
        
        req = Request(url, data=data, headers=headers, method=method)
        
        try:
            with urlopen(req, timeout=timeout) as response:
                return True, json.loads(response.read())
        except HTTPError as e:
            error_data = e.read().decode()
            try:
                error = json.loads(error_data)
                return False, error
            except:
                return False, {"error": error_data}
        except Exception as e:
            return False, {"error": str(e)}
    
    def delete_folder_and_create_collection(self, collection_name):
        """删除Folder并创建Collection"""
        print(f"\n📦 处理 {collection_name}...")
        
        # 第1步: 获取现有的folder信息
        print(f"   1️⃣  查询现有配置...")
        success, result = self.api_request("GET", f"/collections/{collection_name}")
        
        if success:
            print(f"   ⚠️  {collection_name} 已存在")
            # 检查是否是folder
            if result.get('data', {}).get('meta', {}).get('folder'):
                print(f"   🗑️  正在删除现有的Folder...")
                del_success, _ = self.api_request("DELETE", f"/collections/{collection_name}")
                if not del_success:
                    print(f"   ⚠️  删除失败，继续...")
                time.sleep(1)
        
        # 第2步: 创建Collection
        print(f"   2️⃣  创建 {collection_name} Collection...")
        
        collection_configs = {
            "conversations": {
                "collection": "conversations",
                "meta": {
                    "collection": "conversations",
                    "icon": "chat",
                    "display_template": "{{product_name}}",
                    "note": "用户对话历史记录"
                },
                "schema": {
                    "name": "conversations",
                    "comment": "Conversations history"
                }
            },
            "user_preferences": {
                "collection": "user_preferences",
                "meta": {
                    "collection": "user_preferences",
                    "icon": "settings",
                    "note": "用户个性化设置"
                },
                "schema": {
                    "name": "user_preferences",
                    "comment": "User preferences"
                }
            }
        }
        
        config = collection_configs.get(collection_name)
        if not config:
            print(f"   ❌ 不支持的collection: {collection_name}")
            return False
        
        success, result = self.api_request("POST", "/collections", config)
        
        if success:
            print(f"   ✅ {collection_name} Collection 创建成功")
            return True
        else:
            error_msg = result.get('errors', [{}])[0].get('message', str(result))
            if "already exists" in error_msg or "exists" in error_msg:
                print(f"   ℹ️  {collection_name} 已经存在，跳过创建")
                return True
            print(f"   ❌ 创建失败: {error_msg}")
            return False
    
    def create_fields(self, collection_name, fields_config):
        """创建字段"""
        print(f"   3️⃣  创建字段...")
        
        success_count = 0
        for field_name, field_config in fields_config.items():
            # 先检查字段是否存在
            check_ok, _ = self.api_request("GET", f"/fields/{collection_name}/{field_name}")
            if check_ok:
                print(f"      ℹ️  {field_name} 已存在，跳过")
                success_count += 1
                continue
            
            field_data = {
                "field": field_name,
                "type": field_config.get("type", "string"),
            }
            
            if "meta" in field_config:
                field_data["meta"] = field_config["meta"]
            
            if "schema" in field_config:
                field_data["schema"] = field_config["schema"]
            
            success, result = self.api_request(
                "POST",
                f"/fields/{collection_name}",
                field_data
            )
            
            if success:
                print(f"      ✅ {field_name}")
                success_count += 1
            else:
                error_msg = result.get('errors', [{}])[0].get('message', str(result))
                print(f"      ⚠️  {field_name}: {error_msg}")
            
            time.sleep(0.3)  # 避免API限流
        
        print(f"   ✅ {success_count}/{len(fields_config)} 字段创建成功")
        return success_count > 0
    
    def create_conversations(self):
        """创建conversations collection及字段"""
        if not self.delete_folder_and_create_collection("conversations"):
            return False
        
        fields = {
            "user_id": {
                "type": "string",
                "meta": {
                    "field": "user_id",
                    "hidden": False,
                    "required": True,
                    "note": "用户ID"
                },
                "schema": {
                    "name": "user_id",
                    "table": "conversations",
                    "type": "varchar",
                    "max_length": 255,
                    "nullable": False
                }
            },
            "tiktok_url": {
                "type": "string",
                "meta": {
                    "field": "tiktok_url",
                    "hidden": False,
                    "required": False,
                    "note": "TikTok视频链接"
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
                    "required": True,
                    "note": "产品名称"
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
                    "required": True,
                    "note": "产品类别"
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
                    "required": False,
                    "note": "趋势分数 0-100"
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
                    "note": "生命周期阶段"
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
                    "required": False,
                    "note": "完整分析结果"
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
                    "required": False,
                    "note": "用户备注"
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
                    "note": "状态"
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
        
        return self.create_fields("conversations", fields)
    
    def create_user_preferences(self):
        """创建user_preferences collection及字段"""
        if not self.delete_folder_and_create_collection("user_preferences"):
            return False
        
        fields = {
            "user_id": {
                "type": "string",
                "meta": {
                    "field": "user_id",
                    "hidden": False,
                    "required": True,
                    "note": "用户ID"
                },
                "schema": {
                    "name": "user_id",
                    "table": "user_preferences",
                    "type": "varchar",
                    "max_length": 255,
                    "nullable": False
                }
            },
            "theme": {
                "type": "string",
                "meta": {
                    "field": "theme",
                    "hidden": False,
                    "required": False,
                    "note": "主题选择"
                },
                "schema": {
                    "name": "theme",
                    "table": "user_preferences",
                    "type": "varchar",
                    "max_length": 50,
                    "default_value": "auto",
                    "nullable": True
                }
            },
            "language": {
                "type": "string",
                "meta": {
                    "field": "language",
                    "hidden": False,
                    "required": False,
                    "note": "语言设置"
                },
                "schema": {
                    "name": "language",
                    "table": "user_preferences",
                    "type": "varchar",
                    "max_length": 50,
                    "default_value": "zh-CN",
                    "nullable": True
                }
            },
            "notification_enabled": {
                "type": "boolean",
                "meta": {
                    "field": "notification_enabled",
                    "hidden": False,
                    "required": False,
                    "note": "是否启用通知"
                },
                "schema": {
                    "name": "notification_enabled",
                    "table": "user_preferences",
                    "type": "boolean",
                    "default_value": True,
                    "nullable": True
                }
            },
            "preferences": {
                "type": "json",
                "meta": {
                    "field": "preferences",
                    "hidden": False,
                    "required": False,
                    "note": "其他偏好设置"
                },
                "schema": {
                    "name": "preferences",
                    "table": "user_preferences",
                    "type": "json",
                    "nullable": True
                }
            }
        }
        
        return self.create_fields("user_preferences", fields)
    
    def run(self, email, password):
        """执行完整流程"""
        print("\n" + "="*70)
        print("🚀 Directus Collections 自动创建脚本")
        print("="*70)
        
        if not self.login(email, password):
            print("\n❌ 登录失败，无法继续")
            return False
        
        print("\n📋 开始创建Collections...")
        
        # 创建conversations
        print("\n━" * 35)
        print("1️⃣  Conversations Collection")
        print("━" * 35)
        conv_ok = self.create_conversations()
        
        # 创建user_preferences
        print("\n━" * 35)
        print("2️⃣  User Preferences Collection")
        print("━" * 35)
        prefs_ok = self.create_user_preferences()
        
        print("\n" + "="*70)
        if conv_ok and prefs_ok:
            print("✅ 所有Collections创建成功!")
            print("="*70)
            print("\n📝 下一步:")
            print("  1. 在Directus后台配置权限")
            print("  2. 运行验证: python test-directus-api.py")
            print("  3. 刷新前端页面")
            return True
        else:
            print("⚠️  部分Collections创建失败，请检查日志")
            print("="*70)
            return False

def main():
    print("\n" + "="*70)
    print("Directus Collections 创建工具")
    print("="*70)
    
    print("\n请输入管理员账号信息:")
    email = input("📧 管理员邮箱 (默认: magic@gmail.com): ").strip()
    if not email:
        email = "magic@gmail.com"
    
    password = input("🔐 管理员密码: ").strip()
    if not password:
        print("❌ 密码不能为空")
        return False
    
    manager = DirectusManager()
    success = manager.run(email, password)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
