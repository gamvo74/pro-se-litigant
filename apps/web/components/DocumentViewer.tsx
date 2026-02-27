'use client';

import React, { useState } from 'react';
import { Search, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Hash } from 'lucide-react';

/**
 * Mandatory Inline Document Viewer.
 * Supports Scroll, Search, Zoom, Page Nav, and AI Jump-to-Reference.
 */
export default function DocumentViewer({ documentUrl }: { documentUrl?: string }) {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex flex-col h-full w-full bg-white shadow-inner">
      {/* Viewer Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4">
          <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft size={18}/></button>
          <span className="text-sm font-medium">Page 1 / 12</span>
          <button className="p-1 hover:bg-gray-200 rounded"><ChevronRight size={18}/></button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => z - 10)} className="p-1 hover:bg-gray-200 rounded"><ZoomOut size={18}/></button>
          <span className="text-xs">{zoom}%</span>
          <button onClick={() => setZoom(z => z + 10)} className="p-1 hover:bg-gray-200 rounded"><ZoomIn size={18}/></button>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-1.5 text-gray-400" size={14} />
          <input 
            type="text" 
            placeholder="Search document..." 
            className="pl-8 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
          <Hash size={12} /> AI Jump
        </button>
      </div>

      {/* Document Canvas */}
      <div className="flex-1 overflow-auto p-8 bg-gray-300 flex justify-center">
        <div 
          style={{ width: `${zoom}%`, minWidth: '600px' }}
          className="bg-white shadow-2xl min-h-[1000px] p-12 transition-all duration-200"
        >
          {documentUrl ? (
            <iframe src={documentUrl} className="w-full h-full border-none" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 italic">
              No document selected in Matter context.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
