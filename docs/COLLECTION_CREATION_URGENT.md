# ⚠️ Conversations Collection 必须创建

## 🔴 当前问题

你的Directus后台中 `conversations` 只是一个 **Folder**（文件夹），而不是 **Collection**（数据表）。

```
❌ 当前: conversations (Folder)
✅ 需要: conversations (Collection)
```

这导致了所有的API权限问题和403错误。

---

## ✅ 立即修复 (10分钟)

### 方案A: 手动创建 (推荐用于学习)

参考文档: [CREATE_CONVERSATIONS_COLLECTION.md](CREATE_CONVERSATIONS_COLLECTION.md)

**步骤概览**:
1. 进入 https://admin.cnsubscribe.xyz/admin
2. Settings → Data Model
3. Create Collection (conversations)
4. 添加所有需要的字段
5. 配置权限

---

### 方案B: 自动创建脚本 (快速)

运行这个命令创建collection及所有字段:

```bash
cd d:\Demand-os-v4
python scripts/create-directus-collection.py
```

---

## 📋 需要创建的字段列表

在 conversations Collection 中创建这些字段：

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_id | String | ✅ | 用户ID |
| tiktok_url | String | ❌ | TikTok链接 |
| product_name | String | ✅ | 产品名称 |
| category | String | ✅ | 产品类别 |
| trend_score | Integer | ❌ | 趋势分数(0-100) |
| lifecycle | String | ❌ | 生命周期 |
| result | JSON | ❌ | 分析结果 |
| notes | Text | ❌ | 备注 |
| status | String | ❌ | 状态 |

**系统自动创建的字段**:
- id (UUID Primary Key)
- created_at (Timestamp)
- updated_at (Timestamp)

---

## 🔐 权限配置

创建Collection后，配置权限:

1. Settings → Roles & Permissions
2. 选择用户角色 (f2b28dc2-2ddf-47cb-b6c2-731b97b37ea5)
3. 找到 conversations
4. 启用:
   - ☑ Read (All)
   - ☑ Create (All)
   - ☑ Update (All)
   - ☑ Delete (All, 可选)
5. Save

---

## ✨ 完成后验证

```bash
# 运行诊断
python test-directus-api.py

# 期望输出:
# ✅ Conversations表访问成功
```

---

## 🎯 为什么这很重要

- **Folder** = 只是组织结构，不能存储数据
- **Collection** = 实际的数据表，可以存储数据和配置权限

Conversations需要是Collection，才能:
- ✅ 存储对话记录
- ✅ 配置读写权限
- ✅ 通过API访问

---

## 📁 相关文档

- [详细创建指南](CREATE_CONVERSATIONS_COLLECTION.md)
- [setup-directus-schema.md](setup-directus-schema.md) - 原始schema定义
- [自动创建脚本](../scripts/create-directus-collection.py)

---

**重要**: 请立即在Directus后台创建conversations Collection。这是使整个系统工作的必要步骤！
