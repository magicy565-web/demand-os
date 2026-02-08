// task-storage.ts - 任务存储管理器（内存存储，生产环境应使用 Redis）

import { Task } from '../agents/types';

// 使用 global 对象避免在开发环境中重新初始化
declare global {
  var __tasks: Map<string, Task> | undefined;
}

// 内存存储
const tasks: Map<string, Task> = global.__tasks || new Map();
if (!global.__tasks) {
  global.__tasks = tasks;
}

export async function saveTask(taskId: string, task: Partial<Task>): Promise<void> {
  const existingTask = tasks.get(taskId);
  
  if (existingTask) {
    // 更新现有任务
    tasks.set(taskId, { ...existingTask, ...task, updatedAt: new Date().toISOString() });
  } else {
    // 创建新任务
    tasks.set(taskId, {
      taskId,
      userId: task.userId || 'anonymous',
      prompt: task.prompt || '',
      agentId: task.agentId || '',
      status: task.status || 'pending',
      plan: task.plan || [],
      context: task.context || {},
      results: task.results || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...task,
    } as Task);
  }
}

export async function getTask(taskId: string): Promise<Task | null> {
  return tasks.get(taskId) || null;
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
  const task = tasks.get(taskId);
  if (task) {
    tasks.set(taskId, { ...task, ...updates, updatedAt: new Date().toISOString() });
  }
}

export async function deleteTask(taskId: string): Promise<void> {
  tasks.delete(taskId);
}

export async function getAllTasks(): Promise<Task[]> {
  return Array.from(tasks.values());
}
