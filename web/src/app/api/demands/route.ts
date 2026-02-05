import { NextResponse } from "next/server";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus.example.com";

/**
 * API 代理路由 - 解决 CORS 问题
 * GET /api/demands -> Directus /items/demands
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 构建 Directus 查询参数
    const params = new URLSearchParams();
    params.set("sort", "-created_at");
    params.set("filter[status][_eq]", "active");
    
    // 分页参数
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "20";
    params.set("limit", limit);
    params.set("offset", String((parseInt(page) - 1) * parseInt(limit)));

    // 可选过滤条件
    const category = searchParams.get("category");
    const region = searchParams.get("region");
    const urgency = searchParams.get("urgency");

    if (category) params.set("filter[category][_eq]", category);
    if (region) params.set("filter[region][_eq]", region);
    if (urgency) params.set("filter[urgency][_eq]", urgency);

    const response = await fetch(`${DIRECTUS_URL}/items/demands?${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error(`Directus error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("[API] Failed to fetch demands:", error);
    return NextResponse.json(
      { error: "Failed to fetch demands", data: [] },
      { status: 500 }
    );
  }
}
