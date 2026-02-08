"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  FileText,
  Image,
  Download,
  ExternalLink,
  Table,
  BarChart3,
} from "lucide-react";

export interface TaskStep {
  id: string;
  title: string;
  description: string;
  type: "analysis" | "search" | "evaluation" | "recommendation" | "summary";
  status: "pending" | "running" | "completed" | "failed";
  result?: string;
  attachments?: Attachment[];
  data?: any;
}

export interface Attachment {
  id: string;
  name: string;
  type: "image" | "document" | "table" | "chart";
  url: string;
  size?: string;
}

export function TaskResult({ steps }: { steps: TaskStep[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <StepCard key={step.id} step={step} index={index} />
      ))}
    </div>
  );
}

function StepCard({ step, index }: { step: TaskStep; index: number }) {
  const [expanded, setExpanded] = useState(step.status === "completed");

  const getStatusIcon = () => {
    switch (step.status) {
      case "completed":
        return <CheckCircle2 size={20} className="text-emerald-500" />;
      case "running":
        return (
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        );
      case "failed":
        return <Circle size={20} className="text-red-500" />;
      default:
        return <Circle size={20} className="text-gray-300" />;
    }
  };

  const getTypeColor = () => {
    switch (step.type) {
      case "analysis":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "search":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "evaluation":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "recommendation":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "summary":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      className="border border-gray-200 rounded-xl bg-white transition-all duration-300"
      style={{
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
      }}
    >
      {/* 步骤头部 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 p-5 hover:bg-gray-50/50 transition-colors rounded-t-xl"
      >
        <div className="flex-shrink-0 mt-0.5">{getStatusIcon()}</div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">
              步骤 {index + 1}
            </span>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded border ${getTypeColor()}`}
            >
              {step.type}
            </span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {step.title}
          </h3>
          <p className="text-sm text-gray-600">{step.description}</p>
        </div>
        <div className="flex-shrink-0 mt-1">
          {expanded ? (
            <ChevronDown size={20} className="text-gray-400" />
          ) : (
            <ChevronRight size={20} className="text-gray-400" />
          )}
        </div>
      </button>

      {/* 步骤内容 */}
      {expanded && step.result && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="pt-4">
            {/* 结果文本 */}
            <div className="prose prose-sm max-w-none mb-4">
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {step.result}
              </div>
            </div>

            {/* 附件 */}
            {step.attachments && step.attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  相关附件
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {step.attachments.map((attachment) => (
                    <AttachmentCard
                      key={attachment.id}
                      attachment={attachment}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 数据表格 */}
            {step.data && step.data.table && (
              <div className="mt-4">
                <DataTable data={step.data.table} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AttachmentCard({ attachment }: { attachment: Attachment }) {
  const getIcon = () => {
    switch (attachment.type) {
      case "image":
        return <Image size={16} className="text-blue-500" />;
      case "document":
        return <FileText size={16} className="text-green-500" />;
      case "table":
        return <Table size={16} className="text-purple-500" />;
      case "chart":
        return <BarChart3 size={16} className="text-orange-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-200 group"
      style={{
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {attachment.name}
        </p>
        {attachment.size && (
          <p className="text-xs text-gray-500">{attachment.size}</p>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center gap-1">
        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
          <Download size={14} className="text-gray-500" />
        </button>
        <ExternalLink
          size={14}
          className="text-gray-400 group-hover:text-emerald-500 transition-colors"
        />
      </div>
    </a>
  );
}

function DataTable({ data }: { data: any }) {
  if (!data || !data.headers || !data.rows) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {data.headers.map((header: string, index: number) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.rows.map((row: any[], rowIndex: number) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition-colors"
            >
              {row.map((cell: any, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
