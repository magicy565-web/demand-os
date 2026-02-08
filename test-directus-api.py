#!/usr/bin/env python3
"""
Test Directus API permissions and connectivity
"""
import json
import sys
from urllib.request import Request, urlopen, HTTPError
from urllib.parse import urlencode

def test_directus():
    base_url = "https://admin.cnsubscribe.xyz"
    email = "magic@gmail.com"
    password = "wysk1214"
    
    print("=" * 60)
    print("Directus API 权限测试")
    print("=" * 60)
    
    try:
        # Step 1: Login
        print("\n[1/3] 登录...")
        login_url = f"{base_url}/auth/login"
        login_data = json.dumps({"email": email, "password": password}).encode('utf-8')
        login_req = Request(login_url, data=login_data, headers={"Content-Type": "application/json"})
        
        with urlopen(login_req, timeout=10) as response:
            login_response = json.loads(response.read())
            token = login_response.get('data', {}).get('access_token')
            
            if not token:
                print("❌ 登录失败：没有获取到token")
                return False
            
            print(f"✅ 登录成功")
            print(f"   Token: {token[:20]}...")
        
        # Step 2: Get user info
        print("\n[2/3] 获取用户信息...")
        user_url = f"{base_url}/users/me"
        user_req = Request(user_url, headers={"Authorization": f"Bearer {token}"})
        
        with urlopen(user_req, timeout=10) as response:
            user_response = json.loads(response.read())
            user_data = user_response.get('data', {})
            print(f"✅ 用户信息获取成功")
            print(f"   User ID: {user_data.get('id')}")
            print(f"   Email: {user_data.get('email')}")
            print(f"   Role: {user_data.get('role')}")
        
        # Step 3: Test conversations access
        print("\n[3/3] 测试conversations表访问权限...")
        conv_url = f"{base_url}/items/conversations?limit=1"
        conv_req = Request(conv_url, headers={"Authorization": f"Bearer {token}"})
        
        try:
            with urlopen(conv_req, timeout=10) as response:
                conv_response = json.loads(response.read())
                total_count = conv_response.get('meta', {}).get('total_count', 'unknown')
                data_count = len(conv_response.get('data', []))
                
                print(f"✅ Conversations表访问成功")
                print(f"   总记录数: {total_count}")
                print(f"   本次返回: {data_count}")
                
                if data_count > 0:
                    print(f"   首条记录: {conv_response['data'][0].get('product_name', 'N/A')}")
        
        except HTTPError as e:
            error_body = e.read().decode('utf-8')
            print(f"❌ Conversations表访问失败 ({e.code})")
            print(f"   错误信息: {error_body[:200]}")
            return False
        
        print("\n" + "=" * 60)
        print("✅ 所有测试通过！Directus API可正常使用")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"\n❌ 测试失败: {str(e)}")
        print("=" * 60)
        return False

if __name__ == "__main__":
    success = test_directus()
    sys.exit(0 if success else 1)
