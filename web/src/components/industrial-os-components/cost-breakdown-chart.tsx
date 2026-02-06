'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CostBreakdown } from '@/types/c2m';

interface CostBreakdownChartProps {
  data: CostBreakdown;
}

export function CostBreakdownChart({ data }: CostBreakdownChartProps) {
  const chartData = [
    { name: '木材', value: data.woodCost, color: '#3b82f6' },
    { name: '面料', value: data.fabricCost, color: '#06b6d4' },
    { name: '人工', value: data.laborCost, color: '#8b5cf6' },
    { name: '管理', value: data.overheadCost, color: '#64748b' },
    { name: '物流', value: data.logisticsCost, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
