/**
 * Image Upload Zone Component
 * Handles image upload with drag-and-drop support
 */

'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface ImageAnalysisResult {
  category: string;
  confidence: number;
  description: string;
  tags: string[];
}

interface ImageUploadZoneProps {
  token?: string;
  userId?: string;
  onAnalysisComplete?: (result: ImageAnalysisResult) => void;
}

export function ImageUploadZone({
  token,
  userId,
  onAnalysisComplete,
}: ImageUploadZoneProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!token || !userId) {
        setError('缺少认证信息');
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file
      if (!file.type.startsWith('image/')) {
        setError('请上传图片文件');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError('文件大小不能超过 10MB');
        return;
      }

      setIsLoading(true);
      setError(null);
      setSuccess(false);
      setProgress(0);

      try {
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload and analyze
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);

        setProgress(30);

        const response = await fetch('/api/analyze-image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        setProgress(70);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '分析失败');
        }

        const data = await response.json();
        setProgress(100);
        setSuccess(true);

        // Call callback
        onAnalysisComplete?.(data.analysis);

        // Reset after 2 seconds
        setTimeout(() => {
          setSuccess(false);
          setPreview(null);
          setProgress(0);
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : '上传失败');
        setProgress(0);
      } finally {
        setIsLoading(false);
      }
    },
    [token, userId, onAnalysisComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    disabled: isLoading,
    multiple: false,
  });

  return (
    <div className="w-full space-y-4">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center gap-3">
          {isLoading ? (
            <>
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm font-medium">分析中...</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="font-medium">拖拽图片到此或点击选择</p>
                <p className="text-xs text-muted-foreground mt-1">
                  支持 JPG, PNG, GIF, WebP (最大 10MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {isLoading && progress > 0 && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">{progress}%</p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            图片分析完成！
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
