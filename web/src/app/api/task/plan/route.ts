import { NextRequest, NextResponse } from "next/server";
import { generateTaskPlan } from "@/lib/nova-ai-client";
import { v4 as uuidv4 } from "uuid";

/**
 * POST /api/task/plan
 * 根据用户查询生成任务执行计划
 */
export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required and must be a string" },
        { status: 400 }
      );
    }

    // 调用 Nova AI 生成任务规划
    const plan = await generateTaskPlan(query);

    // 生成任务 ID
    const taskId = uuidv4();

    // 返回任务规划
    return NextResponse.json({
      taskId,
      query,
      plan,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating task plan:", error);
    return NextResponse.json(
      { error: "Failed to generate task plan" },
      { status: 500 }
    );
  }
}
