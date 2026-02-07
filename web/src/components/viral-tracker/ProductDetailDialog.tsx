'use client';

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { ViralProduct, PriceOffer } from '@/types/viral-tracker';
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  PlayCircle,
  Factory,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductDetailDialogProps {
  product: ViralProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-slate-50">
        <div className="grid md:grid-cols-2">
          {/* 左侧：视频与素材预览 */}
          <div className="p-6 bg-slate-900 text-white">
            <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black mb-6 border border-slate-800 shadow-2xl">
              <img 
                src={product.originalVideoThumbnail} 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white/80" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                <div className="text-xs font-medium mb-1">Original TikTok Trend</div>
                <div className="text-[10px] text-white/60 truncate">{product.originalVideoUrl}</div>
              </div>
            </div>

            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-4">Production Assets</h3>
            <div className="space-y-3">
              {product.assets.map(asset => (
                <div key={asset.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                      <Video className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">{asset.title}</div>
                      <div className="text-[10px] text-slate-500">{asset.fileSize} • {asset.type.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：报价与工厂信息 */}
          <div className="p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] font-mono uppercase border-slate-200">
                  {product.category}
                </Badge>
                <span className="text-[10px] text-slate-400 font-mono">ID: {product.id}</span>
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900">{product.title}</DialogTitle>
              <DialogDescription className="text-slate-500 text-sm">
                Verified capacity from {product.factoryName}. Last updated {new Date(product.lastUpdated).toLocaleTimeString()}.
              </DialogDescription>
            </DialogHeader>

            {/* 三级报价 */}
            <div className="space-y-4 mb-8">
              <OfferCard 
                offer={product.offers.dropshipping} 
                title="Dropshipping Offer"
                icon={<Package className="w-4 h-4 text-blue-500" />}
                bg="bg-blue-50/50"
                border="border-blue-100"
              />
              <OfferCard 
                offer={product.offers.wholesale} 
                title="Wholesale Pricing"
                icon={<Factory className="w-4 h-4 text-emerald-500" />}
                bg="bg-emerald-50/50"
                border="border-emerald-100"
              />
              <OfferCard 
                offer={product.offers.exclusive} 
                title="Exclusive Supply"
                icon={<ShieldCheck className="w-4 h-4 text-amber-500" />}
                bg="bg-amber-50/50"
                border="border-amber-100"
                isExclusive
              />
            </div>

            {/* 工厂信任背书 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Factory className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{product.factoryName}</div>
                    <div className="text-xs text-slate-500">Tier 1 Manufacturing Partner</div>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Verified</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Quality Assured
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Direct Export
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-6">
                Connect with Factory
              </Button>
              <Button variant="outline" className="px-6 py-6">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const OfferCard = ({ offer, title, icon, bg, border, isExclusive }: { 
  offer: PriceOffer, 
  title: string, 
  icon: React.ReactNode, 
  bg: string, 
  border: string,
  isExclusive?: boolean
}) => (
  <div className={`p-4 rounded-xl border ${border} ${bg} transition-all hover:shadow-sm`}>
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{title}</span>
      </div>
      <div className="text-right">
        <div className="text-lg font-black text-slate-900">${offer.price.toFixed(2)}</div>
        <div className="text-[10px] text-slate-500 font-mono">per unit</div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/50">
      <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
        <Package className="w-3 h-3 opacity-50" />
        MOQ: <span className="font-bold">{offer.moq}</span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
        <Clock className="w-3 h-3 opacity-50" />
        Lead: <span className="font-bold">{offer.leadTime}</span>
      </div>
    </div>
    {isExclusive && (
      <div className="mt-2 text-[10px] text-amber-700 font-medium flex items-center gap-1">
        <ShieldCheck className="w-3 h-3" />
        Exclusive supply contract available for this product.
      </div>
    )}
  </div>
);
