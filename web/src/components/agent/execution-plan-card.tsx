'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle2, Loader2, Clock, XCircle } from 'lucide-react';

interface Step {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  type: 'user_input' | 'system_action';
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

interface ExecutionPlanCardProps {
  steps: Step[];
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'running':
      return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-slate-400" />;
    case 'failed':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Clock className="w-5 h-5 text-slate-400" />;
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'completed':
      return '已完成';
    case 'running':
      return '进行中...';
    case 'pending':
      return '等待中';
    case 'failed':
      return '失败';
    default:
      return '未知';
  }
}

export function ExecutionPlanCard({ steps }: ExecutionPlanCardProps) {
  return (
    <Card className="bg-slate-900 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-100">
          <FileText className="w-5 h-5 text-green-500" />
          执行计划
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getStatusIcon(step.status)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-100">
                {step.icon} {step.name} - {getStatusText(step.status)}
              </p>
              {step.description && (
                <p className="text-xs text-slate-400 mt-1">{step.description}</p>
              )}
              {step.error && (
                <p className="text-xs text-red-400 mt-1">错误: {step.error}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
