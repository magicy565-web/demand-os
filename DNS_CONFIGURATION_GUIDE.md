# DNS 配置诊断和修复指南

## 🔍 当前问题分析

### 发现的问题

1. **域名混淆**
   - 你在开发的是: `saas.cnsubscribe.xyz` ✓
   - 阿里云配置的是: `saas.cnsubscribe.com` ✗
   - 这是**两个完全不同的域名**

2. **DNS 解析状态**
   ```
   saas.cnsubscribe.com   → DNS 超时（配置问题）
   saas.cnsubscribe.xyz   → 47.99.205.136（正确配置）
   ```

3. **IP 地址问题**
   - 当前配置: 47.99.205.136
   - 你的本地开发机: 192.168.1.6
   - 问题: 47.99.205.136 可能是公网生产服务器，不是本地开发环境

## ✅ 修复步骤

### 选项 A: 如果你要在本地开发 (推荐)

#### 1. 获取本地公网IP (如果需要外网访问)
```powershell
# 查看本地网络IP
ipconfig /all

# 如果需要外网访问，需要你的公网IP
curl -s http://ifconfig.me  # 获取公网IP
```

#### 2. 修改阿里云 DNS 记录

**当前配置 (错误)**
```
主机记录: saas
域名: cnsubscribe.com
记录类型: A
记录值: 47.99.205.136 ← 错误
```

**应该改为**

**选项 A1: 本地局域网开发**
```
主机记录: saas
域名: cnsubscribe.com
记录类型: A
记录值: 192.168.1.6  ← 你的本地IP
```

**选项 A2: 外网访问开发机**
```
主机记录: saas
域名: cnsubscribe.com
记录类型: A
记录值: <你的公网IP>  ← 需要家里的公网IP或代理
```

### 选项 B: 如果要指向生产服务器

保持 47.99.205.136，但需要确保：
- [ ] 该IP上运行了你的后端服务
- [ ] Directus API 在该服务器上
- [ ] 防火墙允许访问 HTTP/HTTPS 端口
- [ ] SSL/TLS 证书有效

## 🛠️ 本地开发的最佳方案

### 推荐方案：使用 hosts 文件 + 本地开发

**第一步：修改 Windows hosts 文件**

编辑: `C:\Windows\System32\drivers\etc\hosts`

添加以下行：
```
127.0.0.1       saas.cnsubscribe.com
127.0.0.1       saas.cnsubscribe.xyz
127.0.0.1       admin.cnsubscribe.xyz
```

这样本地所有请求都会指向 localhost，不需要修改 DNS。

**第二步：启动前端开发服务器**
```bash
cd d:\Demand-os-v4\web
npm run dev  # 默认监听 localhost:3000
```

**第三步：访问**
```
http://localhost:3000
http://saas.cnsubscribe.com:3000  (如果需要用域名)
```

### 如果需要外网访问

1. **使用反向代理**（推荐）
   ```bash
   # 使用 ngrok 或 frp 创建公网隧道
   ngrok http 3000
   # 会得到类似: https://abc123.ngrok.io
   ```

2. **使用阿里云弹性公网IP**
   - 分配一个EIP给你的本地机器/服务器
   - DNS 指向这个 EIP

3. **修改 DNS 指向**
   ```
   记录值: 你的公网IP
   ```

## 📋 配置检查清单

### 开发环境配置

- [ ] **前端配置**
  ```
  .env.local:
  NEXT_PUBLIC_API_URL=https://admin.cnsubscribe.xyz
  NEXT_PUBLIC_DIRECTUS_URL=https://admin.cnsubscribe.xyz
  ```

- [ ] **Hosts 文件**
  ```
  127.0.0.1  saas.cnsubscribe.com
  127.0.0.1  saas.cnsubscribe.xyz
  127.0.0.1  admin.cnsubscribe.xyz
  ```

- [ ] **开发服务器**
  ```bash
  npm run dev  # 运行在 localhost:3000
  ```

- [ ] **访问测试**
  ```
  http://localhost:3000
  http://127.0.0.1:3000
  ```

### 生产环境配置

- [ ] **前端配置**
  ```
  .env.production:
  NEXT_PUBLIC_API_URL=https://saas.cnsubscribe.xyz
  NEXT_PUBLIC_DIRECTUS_URL=https://saas.cnsubscribe.xyz
  ```

- [ ] **DNS 配置**
  ```
  主机: saas
  域名: cnsubscribe.xyz
  类型: A
  值: <生产服务器IP>
  ```

- [ ] **Web 服务器** (Nginx/Apache)
  ```
  server_name saas.cnsubscribe.xyz;
  proxy_pass http://localhost:3000;
  ```

## 🔧 立即修复步骤

### 步骤 1: 修改 Windows Hosts 文件
```powershell
# 以管理员身份运行 PowerShell

$hostPath = "C:\Windows\System32\drivers\etc\hosts"
$hostContent = @"
127.0.0.1  localhost
127.0.0.1  saas.cnsubscribe.com
127.0.0.1  saas.cnsubscribe.xyz
127.0.0.1  admin.cnsubscribe.xyz
"@

Add-Content $hostPath $hostContent

# 验证
Get-Content $hostPath | Select-String "cnsubscribe"
```

### 步骤 2: 刷新 DNS 缓存
```powershell
ipconfig /flushdns
# 或者用网络命令
nslookup saas.cnsubscribe.com
```

### 步骤 3: 启动开发服务器
```bash
cd d:\Demand-os-v4\web
npm run dev
```

### 步骤 4: 测试连接
```bash
# 在新终端中
curl -I http://localhost:3000
curl -I http://saas.cnsubscribe.com:3000
```

## ⚠️ 注意事项

1. **Hosts 文件优先级高于 DNS**
   - 修改 hosts 后不需要改阿里云 DNS
   - 适合本地开发

2. **生产部署需要正确的 DNS**
   - 不能依赖 hosts 文件
   - 必须修改阿里云 DNS

3. **证书问题**
   - 自签名证书访问 http:// 可以
   - HTTPS 需要有效证书

## 🚀 推荐方案总结

**当前开发阶段**: 
1. ✅ 使用 hosts 文件本地开发
2. ✅ 前端运行在 localhost:3000
3. ✅ 不需要改阿里云 DNS

**生产部署时**:
1. 修改阿里云 DNS 指向生产服务器
2. 配置生产环境变量
3. 部署到云服务器

---
最后更新: 2026-01-31
