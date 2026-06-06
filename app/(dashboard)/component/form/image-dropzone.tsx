import { useState, useRef, ChangeEvent, DragEvent, useEffect } from 'react';
import { UploadCloud, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageDropzoneProps {
  value?: File;
  onChange: (file: File) => void;
  previewUrl?: string;
}

export function ImageDropzone({
  value,
  onChange,
  previewUrl: initialPreviewUrl,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // If the form resets or initializes with empty file, clear the preview
    if (!value || value.size === 0) {
      const handle = setTimeout(() => {
        setPreviewUrl(initialPreviewUrl || null);
      }, 0);
      return () => clearTimeout(handle);
    }
    const url = URL.createObjectURL(value);
    const handle = setTimeout(() => {
      setPreviewUrl(url);
    }, 0);
    return () => {
      clearTimeout(handle);
      URL.revokeObjectURL(url);
    };
  }, [value]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      onChange(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error('Please upload a valid image file');
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/25 hover:bg-accent/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />
      {previewUrl ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
            <p className="flex items-center text-sm font-medium text-white">
              <UploadCloud className="mr-2 h-4 w-4" />
              Ganti Gambar
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="rounded-full bg-primary p-3">
            <ImageIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-sm">
            <span className="font-semibold text-primary">
              Klik untuk unggah
            </span>{' '}
            atau seret dan lepas
          </div>
          <p className="text-xs text-muted-foreground">
            SVG, PNG, JPG atau GIF (Maks. 1MB)
          </p>
        </div>
      )}
    </div>
  );
}
