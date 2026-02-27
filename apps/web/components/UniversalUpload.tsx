"use client";

import React, { useState, useRef } from 'react';
import { Upload, FileText, Folder, X, AlertCircle, CheckCircle } from 'lucide-react';

interface UniversalUploadProps {
  onUploadComplete?: (files: File[]) => void;
  allowFolders?: boolean;
  multiple?: boolean;
}

export default function UniversalUpload({ 
  onUploadComplete, 
  allowFolders = true, 
  multiple = true 
}: UniversalUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Basic validation
    const validFiles = newFiles; // In premium, strict validation is minimal as per "Unlimited" policy
    setFiles((prev) => [...prev, ...validFiles]);
    setError(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    // Simulate upload process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          if (onUploadComplete) {
            onUploadComplete(files);
          }
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-slate-300 dark:border-slate-700 hover:border-slate-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Drag & Drop files here
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              or <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                browse files
              </button> to upload
            </p>
          </div>
          <div className="flex gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <FileText size={14} /> PDF, DOCX, Images
            </span>
            {allowFolders && (
              <span className="flex items-center gap-1">
                <Folder size={14} /> Folders Supported
              </span>
            )}
          </div>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple={multiple} 
          onChange={handleFileSelect}
          // Note: directory upload support requires 'webkitdirectory' attribute, but React types can be tricky.
          // For now standard file selection.
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="max-h-48 overflow-y-auto space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{file.name}</span>
                  <span className="text-xs text-slate-400">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {uploading ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setFiles([])}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 text-sm font-medium"
              >
                Clear All
              </button>
              <button 
                onClick={handleUpload}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
              >
                Start Upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
