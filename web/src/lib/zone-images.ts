export const ZONE_IMAGES: Record<string, string> = {
  // 1F zones - 使用实际图片
  "1f-retail": "/images/showroom effect/1楼中型展台.jpg",
  "1f-industry": "/images/showroom effect/1楼综合货架.jpg",
  "1f-multifunction": "/images/showroom effect/1楼展台带洽谈区.jpg",
  "1f-digital": "/images/showroom effect/1楼互动区展台.jpg",
  
  // 2F zones
  "2f-showroom-a": "/images/showroom effect/综合展示区.jpg",
  "2f-showroom-b": "/images/showroom effect/展台设计.jpg",
  "2f-showroom-c": "/images/showroom effect/综合展示区.jpg",
  "2f-joint": "/images/showroom effect/2楼联合品牌展区.jpg",
  
  // 3F zones
  "3f-pet": "/images/showroom effect/3楼特色产业展区A.jpg",
  "3f-department": "/images/showroom effect/3楼特色产业区B.jpg",
  "3f-appliance": "/images/showroom effect/3楼特色产业区C.jpg",
  "3f-textile": "/images/showroom effect/3楼特色产业展区A.jpg",
  "3f-stationery": "/images/showroom effect/3楼特色产业区B.jpg",
  "3f-jewelry": "/images/showroom effect/珠宝展台.png",
  "3f-socks": "/images/showroom effect/3楼特色产业区C.jpg",
  "3f-clothing": "/images/showroom effect/3楼特色产业展区A.jpg",
  
  // 4F zones - Livestreaming center
  "4f-livestream-large": "/images/showroom effect/4楼直播基地.jpg",
  "4f-livestream-small-a": "/images/showroom effect/4楼直播基地.jpg",
  "4f-livestream-small-b": "/images/showroom effect/4楼直播基地.jpg",
  "4f-tiktok": "/images/showroom effect/4楼直播基地.jpg",
  
  // 5F zones - Office & Operations
  "5f-open-office": "/images/showroom effect/gallery-lounge.jpg",
  "5f-private-office": "/images/showroom effect/gallery-lounge.jpg",
  "5f-conference": "/images/showroom effect/gallery-lounge.jpg",
  
  // 6F zones - VIP Executive
  "6f-vip-lounge": "/images/showroom effect/gallery-vip.jpg",
  "6f-meeting-suite": "/images/showroom effect/gallery-vip.jpg",
  "6f-presidential": "/images/showroom effect/gallery-vip.jpg",
};

// Floor plan images
export const FLOOR_PLAN_IMAGES: Record<number, string> = {
  1: "/images/floor-plan-1f.png",
  2: "/images/floor-plan-2f.png",
  3: "/images/floor-plan-3f.png",
  4: "/images/floor-plan-4f.png",
  5: "/images/floor-plan-5f.png",
  6: "/images/floor-plan-6f.png",
};

// Building exterior image
export const BUILDING_EXTERIOR_IMAGE = "/images/building-night.jpg";

// Gallery structure cross-section
export const GALLERY_STRUCTURE_IMAGE = "/images/showroom effect/gallery-interior.jpg";

// Floor preview images - representative image for each floor
export const FLOOR_PREVIEW_IMAGES: Record<number, string> = {
  1: "/images/showroom effect/1楼中型展台.jpg",
  2: "/images/showroom effect/综合展示区.jpg",
  3: "/images/showroom effect/3楼特色产业展区A.jpg",
  4: "/images/showroom effect/4楼直播基地.jpg",
  5: "/images/showroom effect/gallery-lounge.jpg",
  6: "/images/showroom effect/gallery-vip.jpg",
};

export function getZoneImage(zoneId: string): string | undefined {
  return ZONE_IMAGES[zoneId];
}

export function getFloorPlanImage(floorId: number): string | undefined {
  return FLOOR_PLAN_IMAGES[floorId];
}
