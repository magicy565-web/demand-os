'use client';

import { motion } from 'framer-motion';
import { C2MConfiguration } from '@/types/c2m';
import { Box, MapPin, Layers, Target } from 'lucide-react';
import { formatCost } from '@/lib/c2m-engine';

interface ConfigSummaryProps {
  config: C2MConfiguration;
}

export function ConfigSummary({ config }: ConfigSummaryProps) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-lg shadow-xl border border-slate-700">
      <div className="text-[10px] font-mono text-slate-400 mb-3 uppercase tracking-widest">配置实时摘要 / CONFIG_SYNC</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryItem 
          icon={<Layers className="w-3.5 h-3.5" />} 
          label="选定材质" 
          value={config.selectedMaterials.wood?.name.split(' ')[0] || '未选择'} 
        />
        <SummaryItem 
          icon={<MapPin className="w-3.5 h-3.5" />} 
          label="目标市场" 
          value={config.selectedMarket?.name || '未选择'} 
        />
        <SummaryItem 
          icon={<Box className="w-3.5 h-3.5" />} 
          label="订购规模" 
          value={`${config.quantity} 件`} 
        />
        <SummaryItem 
          icon={<Target className="w-3.5 h-3.5" />} 
          label="目标预算" 
          value={formatCost(config.targetCost)} 
        />
      </div>
    </div>
  );
}

function SummaryItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="p-1.5 bg-slate-800 rounded text-brand-blue">{icon}</div>
      <div>
        <div className="text-[9px] text-slate-500 uppercase font-mono">{label}</div>
        <div className="text-xs font-bold truncate max-w-[100px]">{value}</div>
      </div>
    </div>
  );
}
