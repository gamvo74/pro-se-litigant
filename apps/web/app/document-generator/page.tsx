"use client";

import React, { useState } from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import { Download, FileText, ChevronRight } from 'lucide-react';

const templates = [
  { id: 1, name: "Complaint for Damages", category: "Civil Litigation" },
  { id: 2, name: "Motion to Dismiss", category: "Civil Litigation" },
  { id: 3, name: "Demand Letter", category: "Pre-Litigation" },
  { id: 4, name: "Interrogatories", category: "Discovery" },
  { id: 5, name: "Answer to Complaint", category: "Civil Litigation" },
];

export default function DocumentGeneratorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Smart Document Generator</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
          <Download size={18} />
          Export Generated
        </button>
      </div>

      {/* Mandatory Universal Upload */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Upload Prior Filings (for style matching)</h3>
        <UniversalUpload multiple={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200">
            Select Template
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[500px] overflow-y-auto">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full text-left p-4 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group ${
                  selectedTemplate === template.id ? 'bg-blue-50 dark:bg-slate-800 border-l-4 border-blue-600' : ''
                }`}
              >
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{template.category}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex items-center justify-center">
          {selectedTemplate ? (
            <div className="w-full space-y-6">
              <h2 className="text-xl font-bold border-b pb-4 mb-6">Drafting: {templates.find(t => t.id === selectedTemplate)?.name}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Plaintiff Name</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Defendant Name</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jurisdiction / Court</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
                </div>
                <div className="pt-4">
                   <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                     Generate Draft with AI
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>Select a template to begin drafting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
