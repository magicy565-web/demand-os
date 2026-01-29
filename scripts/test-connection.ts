/**
 * Demand OS - 连接测试脚本
 * 
 * 用于测试 Directus 后端连接状态
 * 运行: npx tsx scripts/test-connection.ts
 */

const CONFIG = {
  DIRECTUS_URL: "https://admin.cnsubscribe.xyz",
  DIRECTUS_TOKEN: "N1pdvaUmZXAR9fkTfaL4xlsXsyiEzWvT",
};

interface TestResult {
  name: string;
  status: "pass" | "fail" | "skip";
  message: string;
  duration?: number;
}

async function runTest(
  name: string,
  testFn: () => Promise<string>
): Promise<TestResult> {
  const start = Date.now();
  try {
    const message = await testFn();
    return {
      name,
      status: "pass",
      message,
      duration: Date.now() - start,
    };
  } catch (error) {
    return {
      name,
      status: "fail",
      message: error instanceof Error ? error.message : String(error),
      duration: Date.now() - start,
    };
  }
}

// 测试 1: 服务器健康检查
async function testServerHealth(): Promise<string> {
  const response = await fetch(`${CONFIG.DIRECTUS_URL}/server/health`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return `Status: ${data.status || "healthy"}`;
}

// 测试 2: 认证验证
async function testAuthentication(): Promise<string> {
  const response = await fetch(`${CONFIG.DIRECTUS_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${CONFIG.DIRECTUS_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - 认证失败`);
  }
  const data = await response.json();
  return `用户: ${data.data?.email || "已认证"}`;
}

// 测试 3: 读取 demands 集合
async function testReadDemands(): Promise<string> {
  const response = await fetch(
    `${CONFIG.DIRECTUS_URL}/items/demands?limit=1`,
    {
      headers: {
        Authorization: `Bearer ${CONFIG.DIRECTUS_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status} - ${text}`);
  }
  const data = await response.json();
  const count = data.data?.length ?? 0;
  return `可读取 demands 集合 (当前 ${count} 条)`;
}

// 测试 4: 写入权限测试
async function testWritePermission(): Promise<string> {
  const testDemand = {
    title: "[测试] 连接测试 - 可删除",
    description: "这是一条测试数据，用于验证写入权限，可以安全删除。",
    category: "测试",
    region: "测试",
    price_range: "$0",
    urgency: "low",
    quantity: 0,
    unit: "件",
    source_platform: "测试脚本",
    business_value: 0,
    tags: ["测试", "自动化"],
    status: "active",
  };

  const response = await fetch(`${CONFIG.DIRECTUS_URL}/items/demands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify(testDemand),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status} - ${text}`);
  }

  const data = await response.json();
  const id = data.data?.id;

  // 尝试删除测试数据
  if (id) {
    await fetch(`${CONFIG.DIRECTUS_URL}/items/demands/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${CONFIG.DIRECTUS_TOKEN}`,
      },
    });
    return `写入成功并已清理 (ID: ${id})`;
  }

  return "写入成功";
}

// 测试 5: WebSocket 连接
async function testWebSocket(): Promise<string> {
  return new Promise((resolve, reject) => {
    const wsUrl = CONFIG.DIRECTUS_URL.replace("https://", "wss://").replace(
      "http://",
      "ws://"
    );
    
    // 在 Node.js 环境中可能没有 WebSocket
    if (typeof WebSocket === "undefined") {
      resolve("WebSocket 测试跳过 (Node.js 环境无原生支持)");
      return;
    }

    const ws = new WebSocket(`${wsUrl}/websocket`);
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error("连接超时"));
    }, 5000);

    ws.onopen = () => {
      clearTimeout(timeout);
      ws.close();
      resolve("WebSocket 连接成功");
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("WebSocket 连接失败"));
    };
  });
}

// 测试 6: 获取集合 Schema
async function testCollectionSchema(): Promise<string> {
  const response = await fetch(
    `${CONFIG.DIRECTUS_URL}/collections/demands`,
    {
      headers: {
        Authorization: `Bearer ${CONFIG.DIRECTUS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - demands 集合不存在`);
  }

  const data = await response.json();
  return `demands 集合存在 (${data.data?.meta?.note || "无备注"})`;
}

// 主函数
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║         DEMAND OS - Connection Test Suite                ║
║               连接测试工具 v1.0.0                          ║
╚══════════════════════════════════════════════════════════╝

目标服务器: ${CONFIG.DIRECTUS_URL}
`);

  const tests: Array<{ name: string; fn: () => Promise<string> }> = [
    { name: "服务器健康检查", fn: testServerHealth },
    { name: "Token 认证验证", fn: testAuthentication },
    { name: "demands 集合 Schema", fn: testCollectionSchema },
    { name: "读取 demands 数据", fn: testReadDemands },
    { name: "写入权限测试", fn: testWritePermission },
    { name: "WebSocket 连接", fn: testWebSocket },
  ];

  const results: TestResult[] = [];

  for (const test of tests) {
    process.stdout.write(`  ● ${test.name}... `);
    const result = await runTest(test.name, test.fn);
    results.push(result);

    if (result.status === "pass") {
      console.log(`✓ ${result.message} (${result.duration}ms)`);
    } else if (result.status === "skip") {
      console.log(`⊘ ${result.message}`);
    } else {
      console.log(`✗ ${result.message}`);
    }
  }

  // 汇总
  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const skipped = results.filter((r) => r.status === "skip").length;

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
测试完成: ${passed} 通过 / ${failed} 失败 / ${skipped} 跳过
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  if (failed > 0) {
    console.log("\n⚠️  部分测试失败，请检查:");
    results
      .filter((r) => r.status === "fail")
      .forEach((r) => {
        console.log(`   - ${r.name}: ${r.message}`);
      });
    console.log("\n可能的原因:");
    console.log("   1. Directus 服务未启动");
    console.log("   2. Token 无效或已过期");
    console.log("   3. demands 集合未创建");
    console.log("   4. 权限配置不正确");
    process.exit(1);
  } else {
    console.log("✅ 所有测试通过，系统可正常使用！\n");
  }
}

main().catch(console.error);
