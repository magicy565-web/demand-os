'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMaterials, getMarkets, getSuppliers, getDemand, type Material, type Market, type Supplier, type Demand } from '@/lib/directus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function BreakdownPage() {
  const params = useParams();
  const router = useRouter();
  const demandId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [demand, setDemand] = useState<Demand | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [basePrice, setBasePrice] = useState(414000);
  const [targetBudget, setTargetBudget] = useState(500000);
  const [moq, setMoq] = useState(50);

  useEffect(() => {
    loadData();
  }, [demandId]);

  async function loadData() {
    try {
      setLoading(true);
      
      // 并行加载所有数据
      const [demandData, mainMaterials, fabrics, marketData, supplierData] = await Promise.all([
        getDemand(demandId),
        getMaterials('主材'),
        getMaterials('软装面料'),
        getMarkets(),
        getSuppliers()
      ]);
      
      setDemand(demandData);
      setMaterials([...mainMaterials, ...fabrics]);
      setMarkets(marketData);
      setSuppliers(supplierData);
      
      // 设置默认选中项（选择第一个基准价物料）
      const premiumMaterial = mainMaterials.find(m => m.is_premium);
      if (premiumMaterial) setSelectedMaterial(premiumMaterial.id);
      
      const premiumFabric = fabrics.find(f => f.is_premium);
      if (premiumFabric) setSelectedFabric(premiumFabric.id);
      
      if (marketData.length > 0) setSelectedMarket(marketData[0].id);
      
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  // 计算最终价格
  const calculatePrice = () => {
    let price = basePrice;
    
    if (selectedMaterial) {
      const material = materials.find(m => m.id === selectedMaterial);
      if (material && !material.is_premium) {
        price *= (1 + material.price_coefficient);
      }
    }
    
    if (selectedFabric) {
      const fabric = materials.find(m => m.id === selectedFabric);
      if (fabric && !fabric.is_premium) {
        price *= (1 + fabric.price_coefficient);
      }
    }
    
    return Math.round(price);
  };

  const finalPrice = calculatePrice();
  const isWithinBudget = finalPrice <= targetBudget;
  const budgetDiff = targetBudget - finalPrice;
  
  // 匹配的供应商（MOQ <= 设定值）
  const matchedSuppliers = suppliers.filter(s => s.moq <= moq);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">正在加载配置数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">MODULE 02 / C2M ENGINE</Badge>
          <h1 className="text-4xl font-bold mb-4">C2M 柔性反向定制引擎</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            让产能适配需求，而非让需求迁就库存。支持"小单快返"模式，起订量(MOQ)低至 50 件。
          </p>
          
          {demand && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>当前项目：</strong>{demand.project_name} | 
                <strong> 房间数：</strong>{demand.room_count} | 
                <strong> 风格：</strong>{demand.style} | 
                <strong> 预算：</strong>${(demand.budget / 1000).toFixed(0)}K
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：配置选项 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 主材选型 */}
            <Card>
              <CardHeader>
                <CardTitle>主材选型 / MATERIAL_SELECT</CardTitle>
                <CardDescription>选择您偏好的主材类型，价格将实时调整</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {materials.filter(m => m.category === '主材').map((material) => (
                  <div
                    key={material.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedMaterial === material.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedMaterial(material.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{material.name_zh}</h3>
                        <p className="text-sm text-muted-foreground">{material.grade}</p>
                      </div>
                      <div className="text-right">
                        {material.is_premium ? (
                          <Badge variant="default">基准价</Badge>
                        ) : (
                          <Badge 
                            variant={material.price_coefficient > 0 ? "destructive" : "secondary"}
                          >
                            {material.price_coefficient > 0 ? '+' : ''}
                            {(material.price_coefficient * 100).toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 终端市场偏好 */}
            <Card>
              <CardHeader>
                <CardTitle>终端市场偏好</CardTitle>
                <CardDescription>选择目标市场，影响设计风格和合规要求</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {markets.map((market) => (
                    <div
                      key={market.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedMarket === market.id 
                          ? 'border-primary bg-primary/5 shadow-md' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedMarket(market.id)}
                    >
                      <h3 className="font-semibold">{market.name_zh}</h3>
                      <p className="text-sm text-muted-foreground">{market.name_en}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 软装面料 */}
            <Card>
              <CardHeader>
                <CardTitle>软装面料</CardTitle>
                <CardDescription>选择面料类型，影响舒适度和价格</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {materials.filter(m => m.category === '软装面料').map((fabric) => (
                  <div
                    key={fabric.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedFabric === fabric.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedFabric(fabric.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{fabric.name_zh}</h3>
                        <p className="text-sm text-muted-foreground">{fabric.grade}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {fabric.is_premium ? '¥85/㎡' : 
                            `¥${Math.round(85 * (1 + fabric.price_coefficient))}/㎡`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 预算控制 */}
            <Card>
              <CardHeader>
                <CardTitle>目标成本控制</CardTitle>
                <CardDescription>调整预算范围和起订量</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">预算范围</label>
                  <input
                    type="range"
                    min="200000"
                    max="1000000"
                    step="10000"
                    value={targetBudget}
                    onChange={(e) => setTargetBudget(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">¥200K</span>
                    <span className="font-semibold text-lg">¥{(targetBudget / 1000).toFixed(0)}K</span>
                    <span className="text-muted-foreground">¥1,000K</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">起订量 (MOQ)</label>
                  <input
                    type="range"
                    min="30"
                    max="500"
                    step="10"
                    value={moq}
                    onChange={(e) => setMoq(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">30 件</span>
                    <span className="font-semibold text-lg">{moq} 件/款</span>
                    <span className="text-muted-foreground">500 件</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：配置摘要 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>配置摘要 / CONFIG_SUMMARY</CardTitle>
                <CardDescription>实时计算的配置方案</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">主材</span>
                    <span className="font-medium text-right">
                      {selectedMaterial ? 
                        materials.find(m => m.id === selectedMaterial)?.name_zh : 
                        '未选择'
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">市场风格</span>
                    <span className="font-medium text-right">
                      {selectedMarket ? 
                        markets.find(m => m.id === selectedMarket)?.name_zh : 
                        '未选择'
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">面料</span>
                    <span className="font-medium text-right">
                      {selectedFabric ? 
                        materials.find(m => m.id === selectedFabric)?.name_zh : 
                        '未选择'
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">有效MOQ</span>
                    <span className="font-medium">{moq} 件</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">预估总价</span>
                      <span className="text-3xl font-bold text-primary">
                        ¥{finalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {isWithinBudget ? (
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-green-900 dark:text-green-100">符合预算</p>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            差额预算: ¥{budgetDiff.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-red-900 dark:text-red-100">超出预算</p>
                          <p className="text-sm text-red-700 dark:text-red-300">
                            超出: ¥{Math.abs(budgetDiff).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      <strong>{matchedSuppliers.length} 家工厂</strong> 已匹配
                    </p>
                    <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                      {matchedSuppliers.slice(0, 3).map((supplier) => (
                        <li key={supplier.id}>
                          • {supplier.name} ({supplier.moq}天)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Button 
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                  onClick={() => router.push(`/industrial-os/container/${demandId}`)}
                >
                  确认配置，进入拼柜环节 <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
