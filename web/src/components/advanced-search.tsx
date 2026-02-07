'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

interface SearchFilters {
  query: string;
  category: string;
  minScore: number;
  maxScore: number;
  lifecycle: string;
  sortBy: string;
  sortOrder: string;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    minScore: 0,
    maxScore: 100,
    lifecycle: '',
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  const [scoreRange, setScoreRange] = useState<number[]>([0, 100]);

  const handleSearch = () => {
    onSearch({
      ...filters,
      minScore: scoreRange[0],
      maxScore: scoreRange[1],
    });
  };

  const handleReset = () => {
    const defaultFilters: SearchFilters = {
      query: '',
      category: '',
      minScore: 0,
      maxScore: 100,
      lifecycle: '',
      sortBy: 'created_at',
      sortOrder: 'desc',
    };
    setFilters(defaultFilters);
    setScoreRange([0, 100]);
    onSearch(defaultFilters);
  };

  return (
    <div className="space-y-4">
      {/* 快速搜索栏 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索产品名称、类别或备注..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>搜索</Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              高级筛选
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>高级筛选</SheetTitle>
              <SheetDescription>设置详细的搜索条件</SheetDescription>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              {/* 类别筛选 */}
              <div className="space-y-2">
                <Label>产品类别</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    setFilters({ ...filters, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">全部类别</SelectItem>
                    <SelectItem value="electronics">电子产品</SelectItem>
                    <SelectItem value="home_garden">家居园艺</SelectItem>
                    <SelectItem value="sports">运动健身</SelectItem>
                    <SelectItem value="fashion">时尚服饰</SelectItem>
                    <SelectItem value="beauty">美妆护肤</SelectItem>
                    <SelectItem value="toys">玩具游戏</SelectItem>
                    <SelectItem value="automotive">汽车配件</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 趋势分数范围 */}
              <div className="space-y-2">
                <Label>
                  趋势分数: {scoreRange[0]} - {scoreRange[1]}
                </Label>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={scoreRange}
                  onValueChange={setScoreRange}
                  className="mt-2"
                />
              </div>

              {/* 生命周期筛选 */}
              <div className="space-y-2">
                <Label>生命周期</Label>
                <Select
                  value={filters.lifecycle}
                  onValueChange={(value) =>
                    setFilters({ ...filters, lifecycle: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择生命周期" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">全部</SelectItem>
                    <SelectItem value="emerging">新兴期</SelectItem>
                    <SelectItem value="explosive">爆发期</SelectItem>
                    <SelectItem value="mature">成熟期</SelectItem>
                    <SelectItem value="declining">衰退期</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 排序方式 */}
              <div className="space-y-2">
                <Label>排序方式</Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) =>
                    setFilters({ ...filters, sortBy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择排序字段" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at">创建时间</SelectItem>
                    <SelectItem value="updated_at">更新时间</SelectItem>
                    <SelectItem value="trend_score">趋势分数</SelectItem>
                    <SelectItem value="product_name">产品名称</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 排序顺序 */}
              <div className="space-y-2">
                <Label>排序顺序</Label>
                <Select
                  value={filters.sortOrder}
                  onValueChange={(value) =>
                    setFilters({ ...filters, sortOrder: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择排序顺序" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">降序</SelectItem>
                    <SelectItem value="asc">升序</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSearch} className="flex-1">
                  应用筛选
                </Button>
                <Button onClick={handleReset} variant="outline" className="flex-1">
                  重置
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* 当前筛选条件标签 */}
      {(filters.category || filters.lifecycle || scoreRange[0] > 0 || scoreRange[1] < 100) && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              类别: {filters.category}
              <button
                onClick={() => setFilters({ ...filters, category: '' })}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.lifecycle && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              生命周期: {filters.lifecycle}
              <button
                onClick={() => setFilters({ ...filters, lifecycle: '' })}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {(scoreRange[0] > 0 || scoreRange[1] < 100) && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              分数: {scoreRange[0]}-{scoreRange[1]}
              <button
                onClick={() => setScoreRange([0, 100])}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
