'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface StepRendererProps {
  stepId: string;
  componentType: 'form' | 'analysis' | 'strategy' | 'deal';
  componentProps: any;
  onSubmit: (data: any) => void;
}

export function StepRenderer({ stepId, componentType, componentProps, onSubmit }: StepRendererProps) {
  if (componentType === 'form') {
    return <FormRenderer fields={componentProps.fields} onSubmit={onSubmit} />;
  }

  if (componentType === 'analysis') {
    return <AnalysisRenderer analysisData={componentProps.analysisData} region={componentProps.region} onSubmit={onSubmit} />;
  }

  if (componentType === 'strategy') {
    return <StrategyRenderer onSubmit={onSubmit} />;
  }

  if (componentType === 'deal') {
    return <DealRenderer initialFormData={componentProps.initialFormData} onSubmit={onSubmit} />;
  }

  return <div>未知的组件类型: {componentType}</div>;
}

// 表单渲染器
function FormRenderer({ fields, onSubmit }: { fields: any[]; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="bg-slate-900 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-slate-100">请填写产品信息</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-slate-300">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.name}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            提交
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// 分析结果渲染器（简化版）
function AnalysisRenderer({ analysisData, region, onSubmit }: { analysisData: any; region: string; onSubmit: (data: any) => void }) {
  return (
    <Card className="bg-slate-900 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-slate-100">市场分析结果</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-slate-300">
            <strong>目标市场:</strong> {region}
          </p>
          <p className="text-slate-300">
            <strong>潜在采购商数量:</strong> {analysisData?.potentialBuyers?.total || 0}
          </p>
        </div>
        {analysisData?.potentialBuyers?.bestMatch && (
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-400 mb-2">最佳匹配采购商</h3>
            <p className="text-slate-300">
              <strong>姓名:</strong> {analysisData.potentialBuyers.bestMatch.name}
            </p>
            <p className="text-slate-300">
              <strong>公司:</strong> {analysisData.potentialBuyers.bestMatch.companyMasked}
            </p>
            <p className="text-slate-300">
              <strong>位置:</strong> {analysisData.potentialBuyers.bestMatch.location}
            </p>
            <p className="text-slate-300">
              <strong>匹配度:</strong> {analysisData.potentialBuyers.bestMatch.matchScore}%
            </p>
          </div>
        )}
        <Button onClick={() => onSubmit({ confirmed: true })} className="w-full bg-green-600 hover:bg-green-700">
          确认分析结果，继续下一步
        </Button>
      </CardContent>
    </Card>
  );
}

// 策略确认渲染器（简化版）
function StrategyRenderer({ onSubmit }: { onSubmit: (data: any) => void }) {
  return (
    <Card className="bg-slate-900 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-slate-100">合作策略</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-300">
          我们建议采用以下合作策略：
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>优先匹配有 ISO 9001 认证的工厂</li>
          <li>确保工厂具备 OEM/ODM 能力</li>
          <li>建议首单金额在 $10,000 - $50,000 之间</li>
        </ul>
        <Button onClick={() => onSubmit({ confirmed: true })} className="w-full bg-green-600 hover:bg-green-700">
          确认策略，继续下一步
        </Button>
      </CardContent>
    </Card>
  );
}

// 工厂资质表单渲染器（简化版）
function DealRenderer({ initialFormData, onSubmit }: { initialFormData: any; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    establishedYear: '',
    annualRevenue: '',
    mainProductCategory: '',
    mainCertificates: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="bg-slate-900 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-slate-100">工厂资质信息</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="establishedYear" className="text-slate-300">成立年限 *</Label>
            <Input
              id="establishedYear"
              required
              value={formData.establishedYear}
              onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annualRevenue" className="text-slate-300">年营业额 *</Label>
            <Input
              id="annualRevenue"
              required
              value={formData.annualRevenue}
              onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mainProductCategory" className="text-slate-300">主营产品类别 *</Label>
            <Input
              id="mainProductCategory"
              required
              value={formData.mainProductCategory}
              onChange={(e) => setFormData({ ...formData, mainProductCategory: e.target.value })}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            提交资质信息
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
