"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  DollarSign,
  Globe,
  Clock,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

interface PublishDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DemandFormData) => void;
}

export interface DemandFormData {
  title: string;
  description: string;
  category: string;
  region: string;
  priceMin: string;
  priceMax: string;
  urgency: "low" | "medium" | "high" | "critical";
  quantity: string;
  unit: string;
  tags: string[];
  contactEmail: string;
  contactPhone: string;
}

const categories = [
  "消费电子", "服装纺织", "工业制造", "家居生活", 
  "新能源", "物流服务", "食品饮料", "美妆护肤", "其他"
];

const regions = ["北美", "欧洲", "亚太", "中国", "中东", "非洲", "南美", "全球"];

const urgencyOptions = [
  { value: "low", label: "低", color: "bg-green-500" },
  { value: "medium", label: "中", color: "bg-blue-500" },
  { value: "high", label: "高", color: "bg-orange-500" },
  { value: "critical", label: "紧急", color: "bg-red-500" },
];

export function PublishDemandModal({ isOpen, onClose, onSubmit }: PublishDemandModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [tagInput, setTagInput] = useState("");
  
  const [formData, setFormData] = useState<DemandFormData>({
    title: "",
    description: "",
    category: "",
    region: "",
    priceMin: "",
    priceMax: "",
    urgency: "medium",
    quantity: "",
    unit: "件",
    tags: [],
    contactEmail: "",
    contactPhone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DemandFormData, string>>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<Record<keyof DemandFormData, string>> = {};
    
    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "请输入需求标题";
      if (!formData.description.trim()) newErrors.description = "请输入需求描述";
      if (!formData.category) newErrors.category = "请选择品类";
    } else if (currentStep === 2) {
      if (!formData.region) newErrors.region = "请选择目标区域";
      if (!formData.priceMin || !formData.priceMax) newErrors.priceMin = "请输入预算范围";
      if (!formData.quantity) newErrors.quantity = "请输入需求数量";
    } else if (currentStep === 3) {
      if (!formData.contactEmail.trim()) newErrors.contactEmail = "请输入联系邮箱";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(formData);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    setTimeout(() => {
      setSubmitSuccess(false);
      onClose();
      // 重置表单
      setStep(1);
      setFormData({
        title: "",
        description: "",
        category: "",
        region: "",
        priceMin: "",
        priceMax: "",
        urgency: "medium",
        quantity: "",
        unit: "件",
        tags: [],
        contactEmail: "",
        contactPhone: "",
      });
    }, 2000);
  };

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 弹窗内容 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink" />

            {/* 头部 */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">发布需求</h2>
                <p className="text-sm text-white/60 mt-1">填写您的采购需求信息</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* 步骤指示器 */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        step >= s
                          ? "bg-cyber-cyan text-black"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                    </div>
                    <span className={`ml-3 text-sm ${step >= s ? "text-white" : "text-white/40"}`}>
                      {s === 1 && "基本信息"}
                      {s === 2 && "需求详情"}
                      {s === 3 && "联系方式"}
                    </span>
                    {s < 3 && (
                      <div className={`flex-1 h-px mx-4 ${step > s ? "bg-cyber-cyan" : "bg-white/10"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 表单内容 */}
            <div className="p-6 max-h-[50vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1: 基本信息 */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    {/* 标题 */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                        <FileText className="w-4 h-4 text-cyber-cyan" />
                        需求标题 *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="例如：高端智能手表配件供应商"
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyber-cyan transition-colors ${
                          errors.title ? "border-red-500" : "border-white/10"
                        }`}
                      />
                      {errors.title && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    {/* 描述 */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                        <FileText className="w-4 h-4 text-cyber-cyan" />
                        需求描述 *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="详细描述您的需求，包括产品规格、认证要求等..."
                        rows={4}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyber-cyan transition-colors resize-none ${
                          errors.description ? "border-red-500" : "border-white/10"
                        }`}
                      />
                      {errors.description && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.description}
                        </p>
                      )}
                    </div>

                    {/* 品类 */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                        <Tag className="w-4 h-4 text-cyber-cyan" />
                        需求品类 *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.category === cat
                                ? "bg-cyber-cyan text-black"
                                : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      {errors.category && (
                        <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: 需求详情 */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    {/* 目标区域 */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                        <Globe className="w-4 h-4 text-cyber-cyan" />
                        目标区域 *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {regions.map((reg) => (
                          <button
                            key={reg}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, region: reg }))}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.region === reg
                                ? "bg-cyber-purple text-white"
                                : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                            }`}
                          >
                            {reg}
                          </button>
                        ))}
                      </div>
                      {errors.region && (
                        <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.region}
                        </p>
                      )}
                    </div>

                    {/* 预算范围 */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                        <DollarSign className="w-4 h-4 text-cyber-cyan" />
                        预算范围 (USD) *
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={formData.priceMin}
                          onChange={(e) => setFormData(prev => ({ ...prev, priceMin: e.target.value }))}
                          placeholder="最低"
                          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyber-cyan transition-colors"
                        />
                        <span className="text-white/40">-</span>
                        <input
                          type="number"
                          value={formData.priceMax}
                          onChange={(e) => setFormData(prev => ({ ...prev, priceMax: e.target.value }))}
                          placeholder="最高"
                          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyber-cyan transition-colors"
                        />
                      </div>
                      {errors.priceMin && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.priceMin}
                        </p>
                      )}
                    </div>

                    {/* 数量和单位 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-white mb-2 block">需求数量 *</label>
                        <input
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                          placeholder="数量"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyber-cyan transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white mb-2 block">单位</label>
                        <select
                          value={formData.unit}
                          onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                        >
                          <option value="件">件</option>
                          <option value="套">套</option>
                          <option value="吨">吨</option>
                          <option value="卷">卷</option>
                          <option value="服务">服务</option>
                        </select>
                      </div>
                    </div>

                    {/* 紧急度 */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                        <Clock className="w-4 h-4 text-cyber-cyan" />
                        紧急程度
                      </label>
                      <div className="flex gap-3">
                        {urgencyOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, urgency: opt.value as DemandFormData["urgency"] }))}
                            className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                              formData.urgency === opt.value
                                ? `${opt.color} text-white`
                                : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full ${opt.color}`} />
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 标签 */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                        <Tag className="w-4 h-4 text-cyber-cyan" />
                        标签 (最多5个)
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                          placeholder="输入标签后按回车添加"
                          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-cyber-cyan transition-colors text-sm"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="px-4 py-2 bg-cyber-cyan/20 text-cyber-cyan rounded-lg hover:bg-cyber-cyan/30 transition-colors text-sm"
                        >
                          添加
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-cyber-purple/20 text-cyber-purple rounded-full text-sm flex items-center gap-2"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(index)}
                              className="hover:text-white transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: 联系方式 */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">联系邮箱 *</label>
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyber-cyan transition-colors ${
                          errors.contactEmail ? "border-red-500" : "border-white/10"
                        }`}
                      />
                      {errors.contactEmail && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.contactEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">联系电话 (可选)</label>
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                        placeholder="+86 138 0000 0000"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                    </div>

                    {/* 预览 */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="text-sm font-medium text-white mb-3">需求预览</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">标题</span>
                          <span className="text-white">{formData.title || "-"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">品类</span>
                          <span className="text-white">{formData.category || "-"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">区域</span>
                          <span className="text-white">{formData.region || "-"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">预算</span>
                          <span className="text-white">
                            {formData.priceMin && formData.priceMax 
                              ? `$${formData.priceMin} - $${formData.priceMax}` 
                              : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">数量</span>
                          <span className="text-white">
                            {formData.quantity ? `${formData.quantity} ${formData.unit}` : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 底部按钮 */}
            <div className="flex items-center justify-between p-6 border-t border-white/10">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors font-medium"
                >
                  上一步
                </button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-black hover:bg-cyber-cyan/90 transition-colors font-medium"
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitSuccess}
                  className={`px-8 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
                    submitSuccess
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white hover:opacity-90"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      提交中...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      发布成功！
                    </>
                  ) : (
                    "发布需求"
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
