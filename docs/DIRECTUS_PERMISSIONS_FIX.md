# Directus 权限配置指南

## 问题诊断结果

✅ Directus API可以连接  
✅ 用户登录成功 (magic@gmail.com)  
❌ **Conversations表没有访问权限 (403 FORBIDDEN)**  

## 根本原因

用户 `magic@gmail.com` 的角色 `f2b28dc2-2ddf-47cb-b6c2-731b97b37ea5` 对 `conversations` 表没有读取权限。

## 解决方案

### 方法1: 在Directus管理后台配置权限（推荐）

1. **进入Directus管理后台**
   - 访问 https://admin.cnsubscribe.xyz/admin
   - 使用管理员账号登录

2. **导航到权限设置**
   - 左侧菜单 → Settings (设置) → Roles & Permissions
   - 选择角色 `f2b28dc2-2ddf-47cb-b6c2-731b97b37ea5` (magic@gmail.com 的角色)

3. **为 conversations 表配置权限**
   - 查找 `conversations` 表
   - 为该表启用以下权限：
     - ✅ Read
     - ✅ Create  
     - ✅ Update
     - ✅ Delete (可选)

4. **保存设置**
   - 点击保存/更新按钮

### 方法2: 将用户升级为管理员

如果需要完全访问权限，可以为用户分配管理员角色：

1. 进入 Directus Admin
2. 导航到 Users (用户)
3. 找到 `magic@gmail.com`
4. 修改Role为 `Administrator` 或 `Editor`
5. 保存

### 方法3: 创建PUBLIC权限（如果需要匿名访问）

如果需要不需要登录就能访问conversations数据：

1. 进入 Settings → Roles & Permissions
2. 选择 `Public` 角色
3. 为 `conversations` 表启用 `Read` 权限
4. 保存

## 快速修复步骤

**在Directus管理后台执行以下操作：**

1. Settings → Roles & Permissions
2. 找到用户的角色 (ID: f2b28dc2-2ddf-47cb-b6c2-731b97b37ea5)
3. 在 Collections 下找到 `conversations`
4. 为 `conversations` 启用：
   - ☑ Read (All)
   - ☑ Create (All)
   - ☑ Update (All)
5. 点击Save/Update

## 完成后验证

配置完成后，运行此命令验证权限是否生效：

```bash
python test-directus-api.py
```

预期输出：
```
✅ Conversations表访问成功
   总记录数: X
   本次返回: 1
```

## 相关文件

- 权限测试脚本: [test-directus-api.py](../test-directus-api.py)
- 前端API路由: [src/app/api/conversations/route.ts](../web/src/app/api/conversations/route.ts)
