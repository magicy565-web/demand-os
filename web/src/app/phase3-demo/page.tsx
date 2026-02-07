'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import AdvancedSearch from '@/components/advanced-search';
import ExportDialog from '@/components/export-dialog';

interface SearchFilters {
  query: string;
  category: string;
  minScore: number;
  maxScore: number;
  lifecycle: string;
  sortBy: string;
  sortOrder: string;
}

interface ConversationData {
  id: string;
  product_name: string;
  category: string;
  trend_score: number;
  lifecycle: string;
  created_at: string;
  notes: string;
}

export default function Phase3Demo() {
  const [searchResults, setSearchResults] = useState<ConversationData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        query: filters.query,
        category: filters.category,
        minScore: filters.minScore.toString(),
        maxScore: filters.maxScore.toString(),
        lifecycle: filters.lifecycle,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(searchResults.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const getCategoryName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      electronics: '电子产品',
      home_garden: '家居园艺',
      sports: '运动健身',
      fashion: '时尚服饰',
      beauty: '美妆护肤',
      toys: '玩具游戏',
      automotive: '汽车配件',
      other: '其他',
    };
    return categoryMap[category] || category;
  };

  const getLifecycleName = (lifecycle: string): string => {
    const lifecycleMap: Record<string, string> = {
      emerging: '新兴期',
      explosive: '爆发期',
      mature: '成熟期',
      declining: '衰退期',
    };
    return lifecycleMap[lifecycle] || lifecycle;
  };

  const getLifecycleColor = (lifecycle: string): string => {
    const colorMap: Record<string, string> = {
      emerging: 'bg-blue-100 text-blue-800',
      explosive: 'bg-red-100 text-red-800',
      mature: 'bg-green-100 text-green-800',
      declining: 'bg-gray-100 text-gray-800',
    };
    return colorMap[lifecycle] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold">Phase 3 功能演示</h1>
        <p className="text-muted-foreground mt-2">
          高级搜索和数据导出功能
        </p>
      </div>

      {/* 搜索和导出工具栏 */}
      <Card>
        <CardHeader>
          <CardTitle>搜索和筛选</CardTitle>
          <CardDescription>
            使用高级搜索找到您需要的数据，并导出为多种格式
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AdvancedSearch onSearch={handleSearch} />
          
          {searchResults.length > 0 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedIds.length === searchResults.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedIds.length > 0
                    ? `已选择 ${selectedIds.length} 条记录`
                    : '全选'}
                </span>
              </div>
              <ExportDialog selectedIds={selectedIds.length > 0 ? selectedIds : undefined} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 搜索结果 */}
      {isLoading ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            搜索中...
          </CardContent>
        </Card>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            找到 {searchResults.length} 条记录
          </div>
          {searchResults.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectOne(item.id, checked as boolean)}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{item.product_name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{getCategoryName(item.category)}</Badge>
                        <Badge className={getLifecycleColor(item.lifecycle)}>
                          {getLifecycleName(item.lifecycle)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>趋势分数: {item.trend_score}</span>
                      <span>•</span>
                      <span>{item.created_at}</span>
                    </div>
                    <p className="text-sm">{item.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            使用上方搜索框开始搜索
          </CardContent>
        </Card>
      )}
    </div>
  );
}
