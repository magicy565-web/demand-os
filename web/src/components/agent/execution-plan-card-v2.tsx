import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Loader2, XCircle, Clock } from 'lucide-react';

interface ExecutionStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'user_input' | 'system_action';
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

interface ExecutionPlanCardV2Props {
  plan: ExecutionStep[];
}

export function ExecutionPlanCardV2({ plan }: ExecutionPlanCardV2Props) {
  const getStatusIcon = (status: ExecutionStep['status']) => {
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

  const getStatusText = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'running':
        return '进行中...';
      case 'failed':
        return '失败';
      default:
        return '等待中';
    }
  };

  const getStatusColor = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900';
      case 'running':
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900';
      case 'failed':
        return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900';
      default:
        return 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800';
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm sticky top-8">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          执行计划
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {plan.map((step, index) => (
          <div
            key={step.id}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${getStatusColor(
              step.status
            )} ${step.status === 'running' ? 'shadow-lg scale-105' : ''}`}
          >
            {/* 连接线 */}
            {index < plan.length - 1 && (
              <div className="absolute left-7 top-full w-0.5 h-3 bg-slate-200 dark:bg-slate-700" />
            )}

            <div className="flex items-start gap-3">
              {/* 图标 */}
              <div className="flex-shrink-0 mt-0.5">{getStatusIcon(step.status)}</div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{step.icon}</span>
                  <h3 className="font-semibold text-sm">{step.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{step.description}</p>

                {/* 状态标签 */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      step.status === 'completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : step.status === 'running'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : step.status === 'failed'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {getStatusText(step.status)}
                  </span>
                  {step.type === 'user_input' && (
                    <span className="text-xs text-muted-foreground">需要您的输入</span>
                  )}
                </div>

                {/* 错误信息 */}
                {step.error && (
                  <div className="mt-2 p-2 bg-red-50 dark:bg-red-950/20 rounded text-xs text-red-600 dark:text-red-400">
                    {step.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
