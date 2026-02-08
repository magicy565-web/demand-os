/**
 * Booking System Type Definitions
 * 展位预订系统类型定义
 */

export type ExhibitionType = "product" | "brand" | "business";

export interface BookingFormData {
  // 用户信息 User Information
  name: string;
  company: string;
  position?: string;
  email: string;
  phone: string;
  wechat?: string;

  // 展会信息 Exhibition Information
  exhibitionType: ExhibitionType;
  attendeeCount: number;
  specialRequirements?: string;

  // 服务选项 Service Options
  needDecoration: boolean;
  needLogistics: boolean;
  needTranslation: boolean;

  // 展位信息 Zone Information (auto-filled)
  floorId: number;
  floorName: string;
  zoneId: string;
  zoneName: string;
  zoneArea: number;
  dateFrom: Date;
  dateTo: Date;
  totalDays: number;
  dailyRate: number;
  totalPrice: number;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  bookingNumber: string; // Format: BK-YYYYMMDD-XXXX
  status: BookingStatus;
  formData: BookingFormData;
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  cancelledAt?: Date;
  notes?: string;
}

export const EXHIBITION_TYPE_LABELS: Record<ExhibitionType, { zh: string; en: string }> = {
  product: { zh: "产品展示", en: "Product Exhibition" },
  brand: { zh: "品牌发布", en: "Brand Launch" },
  business: { zh: "商务洽谈", en: "Business Meeting" },
};

export const BOOKING_STATUS_LABELS: Record<BookingStatus, { zh: string; en: string; color: string }> = {
  pending: { zh: "待确认", en: "Pending", color: "text-amber-600" },
  confirmed: { zh: "已确认", en: "Confirmed", color: "text-green-600" },
  cancelled: { zh: "已取消", en: "Cancelled", color: "text-red-600" },
  completed: { zh: "已完成", en: "Completed", color: "text-blue-600" },
};

/**
 * Generate a unique booking number
 * 生成唯一的预订编号
 */
export function generateBookingNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `BK-${year}${month}${day}-${random}`;
}

/**
 * Calculate service fee based on selected options
 * 根据选择的服务计算服务费
 */
export function calculateServiceFee(formData: Partial<BookingFormData>): number {
  let fee = 0;
  
  if (formData.needDecoration) {
    fee += 5000; // 装修服务费
  }
  
  if (formData.needLogistics) {
    fee += 3000; // 物流支持费
  }
  
  if (formData.needTranslation) {
    fee += 2000; // 翻译服务费
  }
  
  return fee;
}

/**
 * Calculate total booking cost including services
 * 计算包含服务费的总费用
 */
export function calculateTotalCost(formData: Partial<BookingFormData>): number {
  const basePrice = formData.totalPrice || 0;
  const serviceFee = calculateServiceFee(formData);
  return basePrice + serviceFee;
}
