import { createDirectus, rest, staticToken, readItems, createItem, updateItem } from '@directus/sdk';

// Directus 配置
const DIRECTUS_URL = 'https://admin.cnsubscribe.xyz';
// 使用最新的管理员 Access Token
const DIRECTUS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkNWRmY2Q1LTY4ZDEtNGU3Yi1iZjZhLTUyY2E1YjE2ZDIyOCIsInJvbGUiOiJmMmIyOGRjMi0yZGRmLTQ3Y2ItYjZjMi03MzFiOTdiMzdlYTUiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTc3MDM5NDE4MCwiZXhwIjoxNzcwMzk1MDgwLCJpc3MiOiJkaXJlY3R1cyJ9.fm-qrLlkoir0GV5VkYjR2YB151D53_ESlhwTPLjCM7k';

// 创建 Directus 客户端
export const directus = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

// 类型定义

export interface Factory {
  id: string;
  status: string;
  name: string;
  industrial_belt_id: string;
  main_products: string[];
  moq: number;
  lead_time: number;
  certifications: any;
}

export interface Demand {
  id?: string;
  project_name: string;
  room_count: number;
  style: string;
  budget: number;
  description: string;
  status?: 'pending' | 'processing' | 'completed';
  date_created?: string;
  date_updated?: string;
}

export interface RFQ {
  id: string;
  status: string;
  file_url: string;
  parsed_data: any;
  matched_factories: any;
}

// API 函数

/**
 * 获取所有认证工厂
 */
export async function getFactories(): Promise<Factory[]> {
  try {
    const response = await directus.request(readItems('factories'));
    return response as Factory[];
  } catch (error) {
    console.error('Failed to fetch factories:', error);
    return [];
  }
}

/**
 * 获取所有商机 (Demands)
 */
export async function getDemands(): Promise<Demand[]> {
  try {
    const response = await directus.request(readItems('demands'));
    return response as Demand[];
  } catch (error) {
    console.error('Failed to fetch demands:', error);
    return [];
  }
}

/**
 * 创建新的商机
 */
export async function createDemand(data: Partial<Demand>) {
  try {
    return await directus.request(createItem('demands', data));
  } catch (error) {
    console.error('Failed to create demand:', error);
    throw error;
  }
}

/**
 * 获取所有 RFQs
 */
export async function getRFQs(): Promise<RFQ[]> {
  try {
    const response = await directus.request(readItems('rfqs'));
    return response as RFQ[];
  } catch (error) {
    console.error('Failed to fetch rfqs:', error);
    return [];
  }
}

/**
 * 更新 RFQ
 */
export async function updateRFQ(id: string, data: Partial<RFQ>) {
  try {
    return await directus.request(updateItem('rfqs', id, data));
  } catch (error) {
    console.error('Failed to update rfq:', error);
    throw error;
  }
}
