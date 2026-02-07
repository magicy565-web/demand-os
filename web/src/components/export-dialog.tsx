'use client';

import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ExportDialogProps {
  selectedIds?: string[];
}

export default function ExportDialog({ selectedIds }: ExportDialogProps) {
  const [format, setFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format,
          ids: selectedIds,
        }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // 获取文件名
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : `export-${Date.now()}.${format}`;

      // 下载文件
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('导出成功！');
      setOpen(false);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          导出数据
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>导出数据</DialogTitle>
          <DialogDescription>
            {selectedIds && selectedIds.length > 0
              ? `已选择 ${selectedIds.length} 条记录`
              : '导出所有数据'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>选择导出格式</Label>
            <RadioGroup value={format} onValueChange={(value: any) => setFormat(value)}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-3 cursor-pointer flex-1">
                  <FileText className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium">PDF 文档</div>
                    <div className="text-sm text-muted-foreground">
                      适合打印和分享，包含表格和图表
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center gap-3 cursor-pointer flex-1">
                  <FileSpreadsheet className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Excel 表格</div>
                    <div className="text-sm text-muted-foreground">
                      适合数据分析，可在 Excel 中编辑
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center gap-3 cursor-pointer flex-1">
                  <File className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium">CSV 文件</div>
                    <div className="text-sm text-muted-foreground">
                      纯文本格式，兼容所有表格软件
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleExport} disabled={isExporting} className="flex-1">
              {isExporting ? '导出中...' : '开始导出'}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              取消
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
