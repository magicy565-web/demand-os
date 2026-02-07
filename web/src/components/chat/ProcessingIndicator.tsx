'use client';

/**
 * ProcessingIndicator - 处理中状态指示器
 * 显示 Agent 执行步骤的实时状态
 */

import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';

interface Step {
  id: string;
  agent: string;
  action: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  log: string[];
}

interface ProcessingIndicatorProps {
  steps: Step[];
}

export function ProcessingIndicator({ steps }: ProcessingIndicatorProps) {
  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-slate-300" />;
    }
  };

  const getStatusText = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return '完成';
      case 'running':
        return '进行中...';
      case 'failed':
        return '失败';
      default:
        return '等待中...';
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-3">
          {getStatusIcon(step.status)}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-900">{step.action}</span>
              <span className="text-xs text-slate-500">{getStatusText(step.status)}</span>
            </div>
            {step.log.length > 0 && (
              <p className="text-xs text-slate-600 mt-1">{step.log[step.log.length - 1]}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
