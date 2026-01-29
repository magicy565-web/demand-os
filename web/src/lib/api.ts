import { Demand, DirectusResponse, DemandStats, API_CONFIG } from "@/types/demand";

const { DIRECTUS_URL } = API_CONFIG;

/**
 * 获取需求列表
 */
export async function fetchDemands(
  page: number = 1,
  limit: number = 20,
  filters?: Record<string, unknown>
): Promise<{ data: Demand[]; total: number }> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: ((page - 1) * limit).toString(),
      sort: "-created_at",
      "filter[status][_eq]": "active",
    });

    // 添加额外过滤条件
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(`filter[${key}][_eq]`, String(value));
      });
    }

    const response = await fetch(`${DIRECTUS_URL}/items/demands?${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 }, // ISR: 10秒重新验证
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: DirectusResponse<Demand[]> = await response.json();

    return {
      data: result.data || [],
      total: result.meta?.filter_count || result.data?.length || 0,
    };
  } catch (error) {
    console.error("Failed to fetch demands:", error);
    return { data: [], total: 0 };
  }
}

/**
 * 获取单个需求详情
 */
export async function fetchDemandById(id: string): Promise<Demand | null> {
  try {
    const response = await fetch(`${DIRECTUS_URL}/items/demands/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return null;

    const result: DirectusResponse<Demand> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to fetch demand:", error);
    return null;
  }
}

/**
 * 获取统计数据
 */
export async function fetchStats(): Promise<DemandStats> {
  try {
    // 获取活跃需求数量
    const activeResponse = await fetch(
      `${DIRECTUS_URL}/items/demands?filter[status][_eq]=active&aggregate[count]=id`,
      { headers: { "Content-Type": "application/json" } }
    );

    // 获取总需求数量
    const totalResponse = await fetch(
      `${DIRECTUS_URL}/items/demands?aggregate[count]=id`,
      { headers: { "Content-Type": "application/json" } }
    );

    // 获取区域统计
    const regionsResponse = await fetch(
      `${DIRECTUS_URL}/items/demands?groupBy[]=region&aggregate[count]=id`,
      { headers: { "Content-Type": "application/json" } }
    );

    // 获取分类统计
    const categoriesResponse = await fetch(
      `${DIRECTUS_URL}/items/demands?groupBy[]=category&aggregate[count]=id`,
      { headers: { "Content-Type": "application/json" } }
    );

    const [activeData, totalData, regionsData, categoriesData] = await Promise.all([
      activeResponse.json(),
      totalResponse.json(),
      regionsResponse.json(),
      categoriesResponse.json(),
    ]);

    return {
      active_demands: activeData.data?.[0]?.count?.id || 0,
      total_demands: totalData.data?.[0]?.count?.id || 0,
      regions_covered: regionsData.data?.length || 0,
      categories_count: categoriesData.data?.length || 0,
      total_value: 0, // 需要额外计算
      avg_business_value: 0,
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      total_demands: 0,
      active_demands: 0,
      total_value: 0,
      regions_covered: 0,
      categories_count: 0,
      avg_business_value: 0,
    };
  }
}

/**
 * 获取分类列表
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(
      `${DIRECTUS_URL}/items/demands?groupBy[]=category&aggregate[count]=id`,
      { headers: { "Content-Type": "application/json" } }
    );

    if (!response.ok) return [];

    const result = await response.json();
    return result.data?.map((item: { category: string }) => item.category) || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

/**
 * 获取地区列表
 */
export async function fetchRegions(): Promise<string[]> {
  try {
    const response = await fetch(
      `${DIRECTUS_URL}/items/demands?groupBy[]=region&aggregate[count]=id`,
      { headers: { "Content-Type": "application/json" } }
    );

    if (!response.ok) return [];

    const result = await response.json();
    return result.data?.map((item: { region: string }) => item.region) || [];
  } catch (error) {
    console.error("Failed to fetch regions:", error);
    return [];
  }
}
