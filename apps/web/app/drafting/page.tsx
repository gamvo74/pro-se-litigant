"use client";

import EmptyState from '@/components/EmptyState';

import React, { useState } from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import { Download, FileText, Wand2, Save } from 'lucide-react';

export default function LegalDraftingPage() {
  const [content, setContent] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Legal Drafting Studio</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Save size={18} />
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
            <Download size={18} />
            Export Document
          </button>
        </div>
      </div>

      {/* Mandatory Universal Upload */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Context Files (Discovery, Previous Orders)</h3>
        <UniversalUpload multiple={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
        {/* Clause Library */}
        <div className="col-span-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 overflow-y-auto">
          <h3 className="font-semibold mb-4 text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Wand2 size={16} /> Clause Library
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-blue-400">
              <h4 className="font-medium text-sm">Venue & Jurisdiction</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">The parties hereby agree that venue is proper in...</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-blue-400">
              <h4 className="font-medium text-sm">Integration Clause</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">This Agreement constitutes the entire agreement...</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-blue-400">
              <h4 className="font-medium text-sm">Severability</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">If any provision of this Agreement is held to be...</p>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="col-span-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="border-b border-slate-200 dark:border-slate-800 p-2 flex items-center gap-2">
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded font-bold">B</button>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded italic">I</button>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded underline">U</button>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
            <select className="text-sm bg-transparent">
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Paragraph</option>
            </select>
          </div>
          <textarea 
            className="flex-1 p-4 resize-none outline-none text-slate-800 dark:text-slate-200 bg-transparent font-serif"
            placeholder="Start drafting here or select a clause to insert..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
