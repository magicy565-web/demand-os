# Next.js Hydration Error

## 错误信息

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. 
This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch 'if (typeof window !== 'undefined')'.
- Variable input such as 'Date.now()' or 'Math.random()' which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.
```

## 错误位置

文件：`src/app/layout.tsx` (第 87 行)

```tsx
<html lang="zh-CN" className="scroll-smooth">
  <head>
    <manus-helper-ready="true" />  // ← 这里有问题
    ...
```

## 问题原因

`<manus-helper-ready="true" />` 这个标签格式不正确，应该是：
- 要么是自定义元素：`<manus-helper ready="true"></manus-helper>`
- 要么是 meta 标签：`<meta name="manus-helper" content="ready" />`

## 解决方案

需要检查 `layout.tsx` 文件，修正这个标签的写法。
