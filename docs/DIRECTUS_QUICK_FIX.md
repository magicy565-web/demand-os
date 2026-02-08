# Directus 权限快速配置指南

## 问题

Phase 2演示页面的对话历史功能遇到权限错误:
```
403 FORBIDDEN: You don't have permission to access this.
```

## 快速修复 (5分钟)

### 步骤 1: 登录Directus管理后台

1. 打开浏览器
2. 访问: **https://admin.cnsubscribe.xyz/admin**
3. 使用具有管理员权限的账号登录

### 步骤 2: 打开权限设置

1. 左侧导航栏找到 **Settings** (齿轮图标)
2. 点击 **Roles & Permissions**

### 步骤 3: 选择需要配置的角色

查找角色: **f2b28dc2-2ddf-47cb-b6c2-731b97b37ea5**

或者:
- 也可以查找 email: **magic@gmail.com** 对应的角色
- 或为 `Editor` 或 `Contributor` 这样的通用角色配置

### 步骤 4: 配置 conversations 表权限

1. 在权限列表中找到 **conversations** 表
2. 对于每个权限类型，点击该行:

| 权限 | 推荐设置 |
|------|---------|
| **Read** | ✅ All (所有记录) |
| **Create** | ✅ All |
| **Update** | ✅ All |
| **Delete** | ✅ All (或按需) |
| **Share** | ❌ (可选) |

3. 每个权限通常默认是 "Revoked" (拒绝)，需要改为 "All" 或其他权限级别

### 步骤 5: 保存设置

1. 滚动到页面底部
2. 点击 **Save** 或 **Update** 按钮
3. 等待 "Changes saved successfully" 的提示

### 步骤 6: 验证权限

返回项目目录，运行验证命令:

```bash
cd d:\Demand-os-v4
python test-directus-api.py
```

预期输出:
```
============================================================
Directus API 权限测试
============================================================

[1/3] 登录...
✅ 登录成功

[2/3] 获取用户信息...
✅ 用户信息获取成功

[3/3] 测试conversations表访问权限...
✅ Conversations表访问成功
   总记录数: X
   本次返回: 1

============================================================
✅ 所有测试通过！Directus API可正常使用
============================================================
```

### 步骤 7: 刷新前端

1. 打开浏览器: http://localhost:3000/phase2-demo
2. 按 F5 刷新页面
3. 对话历史应该现在显示真实数据

---

## 如果还有问题？

### 常见问题排查

**Q: 我找不到 conversations 表**  
A: 
- 检查表名拼写 (小写)
- 如果表不存在，需要先在Directus中创建
- 查看 [setup-directus-schema.md](setup-directus-schema.md)

**Q: 权限设置后仍然显示演示数据**  
A:
1. 确保点击了 Save/Update
2. 等待页面显示 "Changes saved" 提示
3. 在浏览器中清除缓存 (Ctrl+Shift+Delete)
4. 重新刷新页面 (Ctrl+F5)

**Q: 我找不到用户的角色**  
A:
- 进入 Users 查找 `magic@gmail.com`
- 记下其 Role ID
- 返回 Roles & Permissions 搜索该ID

**Q: 需要为哪些表配置权限？**  
A:
- **必需**: `conversations` (对话记录)
- **可选**: `image_analyses` (图片分析结果)
- **可选**: `users` (用户数据)

---

## 替代方案: 全局PUBLIC权限

如果不想为每个角色都配置，可以配置PUBLIC权限:

1. Settings → Roles & Permissions
2. 选择 **Public** 角色
3. 对 `conversations` 启用 **Read** 权限
4. 保存

这样所有人都可以读取对话记录 (匿名访问)。

---

## 验证完成

配置完成后，你应该能够在 http://localhost:3000/phase2-demo 看到:
- ✅ 对话历史列表
- ✅ 搜索功能
- ✅ 删除功能
- ✅ 图片上传和分析
- ✅ 深色模式切换

---

**需要帮助?** 
查看详细的 [PHASE2_API_DIAGNOSIS.md](PHASE2_API_DIAGNOSIS.md)
