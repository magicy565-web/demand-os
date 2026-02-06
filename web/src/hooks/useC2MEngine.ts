/**
 * C2M 引擎 React Hook
 * 管理 C2M 配置、成本计算和工厂匹配
 */

import { useState, useCallback, useMemo } from 'react';
import {
  C2MConfiguration,
  CostBreakdown,
  FactoryMatch,
  Material,
  MarketStyle,
  Factory,
} from '@/types/c2m';
import {
  calculateCostBreakdown,
  matchFactories,
  CostCalculationParams,
} from '@/lib/c2m-engine';

export interface UseC2MEngineOptions {
  initialMoq?: number;
  initialQuantity?: number;
  targetCost?: number;
}

export function useC2MEngine(options: UseC2MEngineOptions = {}) {
  const {
    initialMoq = 50,
    initialQuantity = 100,
    targetCost = 1000000,
  } = options;

  // 配置状态
  const [configuration, setConfiguration] = useState<C2MConfiguration>({
    selectedMaterials: {},
    targetCost,
    moq: initialMoq,
    quantity: initialQuantity,
  });

  // 成本分解状态
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null);

  // 工厂匹配结果
  const [matchedFactories, setMatchedFactories] = useState<FactoryMatch[]>([]);

  // 加载和错误状态
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 更新选择的木材
   */
  const setWoodMaterial = useCallback((material: Material | undefined) => {
    setConfiguration(prev => ({
      ...prev,
      selectedMaterials: {
        ...prev.selectedMaterials,
        wood: material,
      },
    }));
  }, []);

  /**
   * 更新选择的面料
   */
  const setFabricMaterial = useCallback((material: Material | undefined) => {
    setConfiguration(prev => ({
      ...prev,
      selectedMaterials: {
        ...prev.selectedMaterials,
        fabric: material,
      },
    }));
  }, []);

  /**
   * 更新选择的市场风格
   */
  const setMarketStyle = useCallback((style: MarketStyle | undefined) => {
    setConfiguration(prev => ({
      ...prev,
      selectedMarket: style,
    }));
  }, []);

  /**
   * 更新目标成本
   */
  const setTargetCost = useCallback((cost: number) => {
    setConfiguration(prev => ({
      ...prev,
      targetCost: cost,
    }));
  }, []);

  /**
   * 更新 MOQ
   */
  const setMoq = useCallback((moq: number) => {
    setConfiguration(prev => ({
      ...prev,
      moq: Math.max(1, moq),
    }));
  }, []);

  /**
   * 更新订购数量
   */
  const setQuantity = useCallback((quantity: number) => {
    setConfiguration(prev => ({
      ...prev,
      quantity: Math.max(1, quantity),
    }));
  }, []);

  /**
   * 计算成本和匹配工厂
   */
  const recalculate = useCallback(
    async (factories: Factory[]) => {
      try {
        setLoading(true);
        setError(null);

        // 构建计算参数
        const params: CostCalculationParams = {
          woodMaterial: configuration.selectedMaterials.wood,
          fabricMaterial: configuration.selectedMaterials.fabric,
          moq: configuration.moq,
          quantity: configuration.quantity,
          marketStyle: configuration.selectedMarket,
        };

        // 计算成本
        const breakdown = calculateCostBreakdown(params);
        breakdown.withinBudget = breakdown.totalCost <= configuration.targetCost;
        setCostBreakdown(breakdown);

        // 匹配工厂
        const matches = matchFactories(
          factories,
          params,
          configuration.targetCost
        );
        setMatchedFactories(matches);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [configuration]
  );

  /**
   * 重置配置
   */
  const reset = useCallback(() => {
    setConfiguration({
      selectedMaterials: {},
      targetCost,
      moq: initialMoq,
      quantity: initialQuantity,
    });
    setCostBreakdown(null);
    setMatchedFactories([]);
    setError(null);
  }, [targetCost, initialMoq, initialQuantity]);

  /**
   * 计算成本是否在预算内
   */
  const withinBudget = useMemo(() => {
    return costBreakdown ? costBreakdown.withinBudget : true;
  }, [costBreakdown]);

  /**
   * 获取最佳匹配工厂
   */
  const topMatchedFactory = useMemo(() => {
    return matchedFactories.length > 0 ? matchedFactories[0] : null;
  }, [matchedFactories]);

  /**
   * 计算成本节省
   */
  const costSavings = useMemo(() => {
    if (!costBreakdown) return null;
    // 假设传统采购成本高 30%
    const traditionalCost = costBreakdown.totalCost * 1.3;
    return {
      amount: traditionalCost - costBreakdown.totalCost,
      percentage: ((traditionalCost - costBreakdown.totalCost) / traditionalCost) * 100,
    };
  }, [costBreakdown]);

  return {
    // 状态
    configuration,
    costBreakdown,
    matchedFactories,
    loading,
    error,
    withinBudget,
    topMatchedFactory,
    costSavings,

    // 更新方法
    setWoodMaterial,
    setFabricMaterial,
    setMarketStyle,
    setTargetCost,
    setMoq,
    setQuantity,
    recalculate,
    reset,
  };
}
