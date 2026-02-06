/**
 * C2M 引擎逻辑测试脚本
 * 验证成本计算、阶梯定价和工厂匹配是否符合预期
 */

import { calculateCostBreakdown, matchFactories, getApplicablePriceTier } from '../src/lib/c2m-engine';
import { MATERIALS, MARKET_STYLES, FACTORIES } from '../src/data/c2m-data';
import { CostCalculationParams } from '../src/types/c2m';

function runTests() {
  console.log('🚀 开始测试 C2M 引擎核心逻辑...\n');

  // 1. 测试成本计算
  console.log('--- 1. 成本计算测试 ---');
  const params: CostCalculationParams = {
    woodMaterial: MATERIALS.find(m => m.id === 'wood-oak'),
    fabricMaterial: MATERIALS.find(m => m.id === 'fabric-linen'),
    moq: 50,
    quantity: 100,
    marketStyle: MARKET_STYLES[0],
  };

  const breakdown = calculateCostBreakdown(params);
  console.log('木材成本 (100件):', breakdown.woodCost);
  console.log('面料成本 (100件):', breakdown.fabricCost);
  console.log('总成本:', breakdown.totalCost);
  console.log('单位价格:', breakdown.unitPrice);

  if (breakdown.totalCost > 0 && breakdown.unitPrice > 0) {
    console.log('✅ 成本计算逻辑正常\n');
  } else {
    console.log('❌ 成本计算逻辑异常\n');
  }

  // 2. 测试阶梯定价
  console.log('--- 2. 阶梯定价测试 ---');
  const factory = FACTORIES[0]; // 50, 200, 500, 1000
  
  const tier1 = getApplicablePriceTier(factory, 100);
  console.log('100件 适用单价:', tier1.unitPrice); // 2800
  
  const tier2 = getApplicablePriceTier(factory, 300);
  console.log('300件 适用单价:', tier2.unitPrice); // 2660
  
  const tier3 = getApplicablePriceTier(factory, 1200);
  console.log('1200件 适用单价:', tier3.unitPrice); // 2380

  if (tier1.unitPrice === 2800 && tier2.unitPrice === 2660 && tier3.unitPrice === 2380) {
    console.log('✅ 阶梯定价逻辑正常\n');
  } else {
    console.log('❌ 阶梯定价逻辑异常\n');
  }

  // 3. 测试工厂匹配
  console.log('--- 3. 工厂匹配测试 ---');
  const matches = matchFactories(FACTORIES, params, 1000000);
  console.log('匹配到的工厂数量:', matches.length);
  console.log('最佳匹配工厂:', matches[0].factory.name, '分数:', matches[0].matchScore);

  if (matches.length > 0 && matches[0].matchScore >= 50) {
    console.log('✅ 工厂匹配逻辑正常\n');
  } else {
    console.log('❌ 工厂匹配逻辑异常\n');
  }

  // 4. 测试市场风格联动
  console.log('--- 4. 市场风格联动测试 ---');
  const meParams: CostCalculationParams = {
    ...params,
    woodMaterial: MATERIALS.find(m => m.id === 'wood-walnut'), // 中东风格推荐
    marketStyle: MARKET_STYLES.find(m => m.id === 'market-me'),
  };
  const meMatches = matchFactories(FACTORIES, meParams, 2000000);
  console.log('中东风格最佳匹配:', meMatches[0].factory.name, '分数:', meMatches[0].matchScore);

  console.log('\n✨ 所有核心逻辑测试完成！');
}

runTests();
