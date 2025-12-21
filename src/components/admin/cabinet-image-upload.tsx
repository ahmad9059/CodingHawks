"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, Users } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface CabinetImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function CabinetImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
}: CabinetImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      // Create a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `cabinet/${fileName}`;

      console.log(
        "🚀 Uploading cabinet image to conding-hawks bucket:",
        filePath
      );

      // Upload to Supabase Storage (try direct upload)
      const { data, error } = await supabase.storage
        .from("conding-hawks")
        .upload(filePath, file);

      if (error) {
        console.error("Upload error:", error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      console.log("✅ Upload successful:", data);

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("conding-hawks").getPublicUrl(filePath);

      console.log("🔗 Public URL:", publicUrl);

      onChange(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Error uploading image: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 10MB to match bucket limit)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      uploadImage(file);
    }
  };

  const handleRemove = () => {
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <Label>Profile Image</Label>

      {value ? (
        <div className="relative">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mx-auto">
            <Image
              src={value}
              alt="Profile image"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 rounded-full"
            onClick={handleRemove}
            disabled={disabled || uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Profile Image
                  </>
                )}
              </Button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
            <p className="text-xs text-gray-400">
              Recommended: Square image (1:1 ratio)
            </p>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />
    </div>
  );
}
