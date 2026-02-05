import { createDirectus, rest, staticToken, readItems, createItem } from '@directus/sdk';

// Directus 配置
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.cnsubscribe.xyz';
const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkNWRmY2Q1LTY4ZDEtNGU3Yi1iZjZhLTUyY2E1YjE2ZDIyOCIsInJvbGUiOiJmMmIyOGRjMi0yZGRmLTQ3Y2ItYjZjMi03MzFiOTdiMzdlYTUiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTc3MDI5ODM4NiwiZXhwIjoxNzcwMjk5Mjg2LCJpc3MiOiJkaXJlY3R1cyJ9._VC2H6v_yLPO3xP4RqnD8B9riNdjhwIVJvXHbzzOx70';

// 创建 Directus 客户端
export const directus = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

// 类型定义
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

export interface Material {
  id: string;
  name_zh: string;
  name_en: string;
  category: '主材' | '软装面料';
  grade: string;
  price_coefficient: number;
  is_premium: boolean;
}

export interface Market {
  id: string;
  name_zh: string;
  name_en: string;
  region: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  category: string;
  moq: number;
}

// API 函数

/**
 * 创建需求订单
 */
export async function createDemand(data: Omit<Demand, 'id' | 'status' | 'date_created' | 'date_updated'>) {
  try {
    const response = await directus.request(
      createItem('demands', {
        id: crypto.randomUUID(),
        ...data,
        status: 'pending',
      })
    );
    return response;
  } catch (error) {
    console.error('Failed to create demand:', error);
    throw error;
  }
}

/**
 * 获取所有物料
 */
export async function getMaterials(category?: '主材' | '软装面料'): Promise<Material[]> {
  try {
    const filter = category ? { category: { _eq: category } } : {};
    const response = await directus.request(
      readItems('materials', { filter })
    );
    return response as Material[];
  } catch (error) {
    console.error('Failed to fetch materials:', error);
    return [];
  }
}

/**
 * 获取所有市场
 */
export async function getMarkets(): Promise<Market[]> {
  try {
    const response = await directus.request(readItems('markets'));
    return response as Market[];
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return [];
  }
}

/**
 * 获取所有供应商
 */
export async function getSuppliers(): Promise<Supplier[]> {
  try {
    const response = await directus.request(readItems('suppliers'));
    return response as Supplier[];
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    return [];
  }
}

/**
 * 获取单个需求订单
 */
export async function getDemand(id: string): Promise<Demand | null> {
  try {
    const response = await directus.request(
      readItems('demands', {
        filter: { id: { _eq: id } },
        limit: 1
      })
    );
    return response[0] as Demand || null;
  } catch (error) {
    console.error('Failed to fetch demand:', error);
    return null;
  }
}
