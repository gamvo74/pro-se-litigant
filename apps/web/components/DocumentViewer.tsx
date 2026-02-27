"use client";

import React, { useState } from 'react';
import { X, Search, ZoomIn, ZoomOut, ChevronRight, ChevronLeft, FileText } from 'lucide-react';

export default function DocumentViewer() {
  const [isOpen, setIsOpen] = useState(true);
  const [zoom, setZoom] = useState(100);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-900 border-l border-t border-b border-slate-200 dark:border-slate-800 p-2 rounded-l-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors z-50"
      >
        <ChevronLeft size={20} className="text-slate-600 dark:text-slate-400" />
      </button>
    );
  }

  return (
    <div className="w-96 h-full border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-xl z-40 transition-all duration-300">
      <div className="h-14 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 bg-slate-50 dark:bg-slate-950">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <FileText size={16} /> Document Viewer
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded">
            <ZoomOut size={16} />
          </button>
          <span className="text-xs w-8 text-center">{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded">
            <ZoomIn size={16} />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-red-500 ml-2">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Search in document..." 
            className="w-full pl-8 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
        <div 
          className="bg-white shadow-lg min-h-[500px] w-full max-w-[800px] p-8 transition-transform origin-top-left"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div className="space-y-4 text-slate-800">
            <h1 className="text-2xl font-bold mb-4">Sample Document</h1>
            <p>This is a placeholder for the document viewer.</p>
            <p>In a real implementation, this would render PDF, DOCX, or images using libraries like pdf.js or mammoth.js.</p>
            <p className="text-slate-400 italic">
              [Document Content Would Appear Here]
            </p>
            {/* Mock content */}
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i} className="text-sm text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
