'use client';

import { Factory, PriceTier } from '@/types/c2m';
import { formatCost } from '@/lib/c2m-engine';

interface PriceTierDisplayProps {
  factory: Factory;
  currentQuantity: number;
}

export function PriceTierDisplay({ factory, currentQuantity }: PriceTierDisplayProps) {
  return (
    <div className="mt-4 border-t border-gray-100 pt-3">
      <div className="text-[10px] font-mono text-slate mb-2 uppercase tracking-wider">阶梯定价策略</div>
      <div className="space-y-1.5">
        {factory.priceTiers.map((tier, idx) => {
          const isActive = currentQuantity >= tier.minQty && (!tier.maxQty || currentQuantity <= tier.maxQty);
          return (
            <div
              key={idx}
              className={`flex justify-between items-center px-2 py-1.5 rounded text-[10px] transition-colors ${
                isActive ? 'bg-brand-blue/10 border border-brand-blue/20' : 'bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`font-mono ${isActive ? 'text-brand-blue font-bold' : 'text-slate'}`}>
                  {tier.minQty}{tier.maxQty ? `-${tier.maxQty}` : '+'} 件
                </span>
                {tier.discount > 0 && (
                  <span className="bg-green-100 text-green-700 px-1 rounded">
                    -{Math.round(tier.discount * 100)}%
                  </span>
                )}
              </div>
              <div className={`font-mono ${isActive ? 'text-brand-blue font-bold' : 'text-slate'}`}>
                {formatCost(tier.unitPrice)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
