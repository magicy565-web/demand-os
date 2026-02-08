"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  UserIcon,
  BuildingIcon,
  MailIcon,
  PhoneIcon,
  MessageSquareIcon,
  CalendarIcon,
  MapPinIcon,
  DollarSignIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
  SparklesIcon,
} from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Zone, Floor } from "@/lib/floor-data";
import {
  type BookingFormData,
  type ExhibitionType,
  EXHIBITION_TYPE_LABELS,
  generateBookingNumber,
  calculateServiceFee,
  calculateTotalCost,
} from "@/lib/booking-types";

const formSchema = z.object({
  name: z.string().min(2, "姓名至少2个字符"),
  company: z.string().min(2, "公司名称至少2个字符"),
  position: z.string().optional(),
  email: z.string().email("请输入有效的邮箱地址"),
  phone: z.string().min(11, "请输入有效的手机号码"),
  wechat: z.string().optional(),
  exhibitionType: z.enum(["product", "brand", "business"]),
  attendeeCount: z.number().min(1, "参展人数至少为1").max(1000, "参展人数不能超过1000"),
  specialRequirements: z.string().optional(),
  needDecoration: z.boolean().default(false),
  needLogistics: z.boolean().default(false),
  needTranslation: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface BookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedZone: Zone | null;
  selectedFloor: Floor | null;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  totalDays: number;
  totalPrice: number;
  onBookingComplete: (booking: BookingFormData) => void;
}

export function BookingFormDialog({
  open,
  onOpenChange,
  selectedZone,
  selectedFloor,
  dateRange,
  totalDays,
  totalPrice,
  onBookingComplete,
}: BookingFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<"form" | "confirmation">("form");
  const [bookingNumber, setBookingNumber] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
      email: "",
      phone: "",
      wechat: "",
      exhibitionType: "product",
      attendeeCount: 1,
      specialRequirements: "",
      needDecoration: false,
      needLogistics: false,
      needTranslation: false,
    },
  });

  const watchedValues = form.watch();
  const serviceFee = calculateServiceFee({
    needDecoration: watchedValues.needDecoration,
    needLogistics: watchedValues.needLogistics,
    needTranslation: watchedValues.needTranslation,
  });
  const finalTotal = totalPrice + serviceFee;

  const onSubmit = async (values: FormValues) => {
    if (!selectedZone || !selectedFloor || !dateRange.from || !dateRange.to) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const bookingData: BookingFormData = {
      ...values,
      floorId: selectedFloor.id,
      floorName: selectedFloor.name,
      zoneId: selectedZone.id,
      zoneName: selectedZone.name,
      zoneArea: selectedZone.area,
      dateFrom: dateRange.from,
      dateTo: dateRange.to,
      totalDays,
      dailyRate: selectedZone.price,
      totalPrice: finalTotal,
    };

    const generatedBookingNumber = generateBookingNumber();
    setBookingNumber(generatedBookingNumber);

    setIsSubmitting(false);
    setCurrentStep("confirmation");
    
    // Call parent callback
    onBookingComplete(bookingData);
  };

  const handleClose = () => {
    if (currentStep === "confirmation") {
      // Reset form and step when closing after confirmation
      form.reset();
      setCurrentStep("form");
    }
    onOpenChange(false);
  };

  if (!selectedZone || !selectedFloor) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {currentStep === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <SparklesIcon className="h-6 w-6 text-primary" />
                预订展位 Reserve Zone
              </DialogTitle>
              <DialogDescription>
                请填写以下信息完成展位预订 | Please fill in the information to complete your booking
              </DialogDescription>
            </DialogHeader>

            {/* Booking Summary */}
            <div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-4 border border-primary/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span>展位信息</span>
                  </div>
                  <p className="font-semibold">
                    {selectedFloor.name} - {selectedZone.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedZone.area} sqm
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>日期</span>
                  </div>
                  <p className="font-semibold">
                    {dateRange.from && format(dateRange.from, "yyyy-MM-dd", { locale: zhCN })}
                    {" - "}
                    {dateRange.to && format(dateRange.to, "yyyy-MM-dd", { locale: zhCN })}
                  </p>
                  <p className="text-sm text-muted-foreground">{totalDays} 天</p>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* User Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">联系信息 Contact Information</h3>
                  </div>
                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>姓名 Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="张三" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>公司名称 Company *</FormLabel>
                          <FormControl>
                            <Input placeholder="深圳某科技有限公司" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>职位 Position</FormLabel>
                          <FormControl>
                            <Input placeholder="市场总监" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>邮箱 Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>手机号码 Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="13800138000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wechat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>微信号 WeChat</FormLabel>
                          <FormControl>
                            <Input placeholder="wechat_id" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Exhibition Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BuildingIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">展会信息 Exhibition Information</h3>
                  </div>
                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="exhibitionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>展会类型 Exhibition Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择展会类型" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(EXHIBITION_TYPE_LABELS).map(([key, label]) => (
                                <SelectItem key={key} value={key}>
                                  {label.zh} | {label.en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="attendeeCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>预计参展人数 Attendee Count *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="1000"
                              placeholder="10"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="specialRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>特殊需求 Special Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="请描述您的特殊需求，例如：展台设计风格、特殊设备需求等"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          如有特殊需求，请详细说明，我们将尽力满足
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Service Options Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">增值服务 Additional Services</h3>
                  </div>
                  <Separator />

                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="needDecoration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="font-semibold cursor-pointer">
                              展台装修服务 Decoration Service
                            </FormLabel>
                            <FormDescription>
                              专业设计团队提供展台设计与装修服务 (+¥5,000)
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="needLogistics"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="font-semibold cursor-pointer">
                              物流支持服务 Logistics Support
                            </FormLabel>
                            <FormDescription>
                              提供展品运输、仓储、现场物流协调服务 (+¥3,000)
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="needTranslation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="font-semibold cursor-pointer">
                              翻译服务 Translation Service
                            </FormLabel>
                            <FormDescription>
                              提供现场中英文翻译服务 (+¥2,000)
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-6 border border-primary/20 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSignIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">费用明细 Price Summary</h3>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">展位费用 (¥{selectedZone.price.toLocaleString()} × {totalDays}天)</span>
                      <span className="font-medium">¥{totalPrice.toLocaleString()}</span>
                    </div>
                    
                    {serviceFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">增值服务费用</span>
                        <span className="font-medium">¥{serviceFee.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-lg font-semibold">总计 Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ¥{finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => onOpenChange(false)}
                    disabled={isSubmitting}
                  >
                    取消 Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        提交中...
                      </>
                    ) : (
                      <>
                        提交预订 Submit Booking
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <>
            {/* Confirmation Screen */}
            <div className="text-center py-8 space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-500/10 p-6">
                  <CheckCircle2Icon className="h-16 w-16 text-green-600" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">预订成功！</h2>
                <p className="text-xl text-muted-foreground">Booking Confirmed!</p>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-6 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">预订编号 Booking Number</p>
                <p className="text-3xl font-bold text-primary font-mono">{bookingNumber}</p>
              </div>

              <div className="text-left space-y-3 bg-muted/30 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">预订详情 Booking Details</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">展位</p>
                    <p className="font-medium">{selectedFloor.name} - {selectedZone.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">面积</p>
                    <p className="font-medium">{selectedZone.area} sqm</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">日期</p>
                    <p className="font-medium">
                      {dateRange.from && format(dateRange.from, "yyyy-MM-dd")} - {dateRange.to && format(dateRange.to, "yyyy-MM-dd")}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">总费用</p>
                    <p className="font-medium text-primary text-lg">¥{finalTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 text-sm">
                <p className="text-blue-900 dark:text-blue-200">
                  <strong>下一步：</strong>我们的销售团队将在24小时内通过邮件和电话与您联系，确认预订详情并安排付款事宜。
                </p>
                <p className="text-blue-700 dark:text-blue-400 mt-2">
                  <strong>Next Steps:</strong> Our sales team will contact you within 24 hours via email and phone to confirm booking details and arrange payment.
                </p>
              </div>

              <Button onClick={handleClose} className="w-full" size="lg">
                完成 Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
