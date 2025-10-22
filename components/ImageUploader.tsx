
import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFileName(file.name);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
      setImagePreview(null);
      setFileName(null);
      onImageUpload(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFileName(file.name);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };


  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
        <span className="bg-indigo-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">1</span>
        Upload Your Photo
      </h2>
      <div 
        className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors duration-300 bg-gray-800"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {imagePreview ? (
          <div className="relative group">
            <img src={imagePreview} alt="Preview" className="mx-auto max-h-60 rounded-lg shadow-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                    Remove Image
                </button>
            </div>
            <p className="text-sm text-gray-400 mt-2 truncate">{fileName}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <UploadIcon className="w-12 h-12 mb-3 text-gray-500" />
            <p className="font-semibold text-gray-300">Click to upload or drag & drop</p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};
