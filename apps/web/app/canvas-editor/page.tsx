"use client";

import React from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import { Download, MousePointer, Type, Square, Circle, Image as ImageIcon, Undo, Redo } from 'lucide-react';

export default function CanvasEditorPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Visual Canvas Editor</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
            <Download size={18} />
            Export Canvas (PDF/PNG)
          </button>
        </div>
      </div>

      {/* Mandatory Universal Upload */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 shrink-0">
        <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Import Exhibits/Diagrams</h3>
        <UniversalUpload multiple={true} allowFolders={false} />
      </div>

      {/* Editor Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-lg flex items-center p-2 gap-2 shadow-sm shrink-0">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
          <MousePointer size={18} />
        </button>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
          <Type size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
          <Square size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
          <Circle size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
          <ImageIcon size={18} />
        </button>
        <div className="flex-1"></div>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
          <Undo size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
          <Redo size={18} />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-950 border-x border-b border-slate-200 dark:border-slate-800 rounded-b-lg shadow-inner relative overflow-hidden flex items-center justify-center">
        <div className="bg-white shadow-xl w-[800px] h-[600px] relative">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
            {/* Grid Lines for reference */}
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border-r border-b border-slate-100 dark:border-slate-50 opacity-20"></div>
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-300 font-bold text-4xl select-none">
            Canvas Workspace
          </div>
        </div>
      </div>
    </div>
  );
}
