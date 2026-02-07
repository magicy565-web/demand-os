'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { agentTemplates } from '@/lib/agent-templates';
import { AgentWorkflow } from '@/lib/agent-workflow-engine';
import WorkflowEditorLayout from '@/components/workflow-editor/workflow-editor-layout';
import { toast } from 'sonner';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkflowEditorPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  // 查找对应的工作流模板
  const template = agentTemplates.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold">工作流不存在</h1>
        <p className="text-muted-foreground mt-2">未找到 ID 为 {id} 的工作流</p>
      </div>
    );
  }

  const handleSave = (workflow: AgentWorkflow) => {
    // TODO: 实现保存逻辑（保存到 Directus 或本地存储）
    console.log('保存工作流:', workflow);
    toast.success('工作流已保存');
  };

  const handleExecute = (workflow: AgentWorkflow) => {
    // TODO: 实现执行逻辑（跳转到执行页面）
    console.log('执行工作流:', workflow);
    router.push(`/agents/${workflow.id}/execute`);
  };

  const handleExport = (workflow: AgentWorkflow) => {
    // 导出为 JSON 文件
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${workflow.id}-workflow.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('工作流已导出');
  };

  return (
    <WorkflowEditorLayout
      workflow={template}
      onSave={handleSave}
      onExecute={handleExecute}
      onExport={handleExport}
    />
  );
}
