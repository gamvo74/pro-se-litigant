"use client";

import React, { useState } from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import EmptyState from '@/components/EmptyState';
import { Download, Plus, Calendar, FileText } from 'lucide-react';

export default function MedicalChronologyPage() {
  const [records, setRecords] = useState<{ name: string }[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Medical Chronology & Causation</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Add Record
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
            <Download size={18} />
            Export Chronology
          </button>
        </div>
      </div>

      {/* Mandatory Universal Upload */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Upload Medical Records (PDF, Images)</h3>
        <UniversalUpload multiple={true} allowFolders={true} onUploadComplete={(files) => setRecords(files.map(f => ({ name: f.name })))} />
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-semibold mb-4">Timeline View</h3>
        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8 pl-6 py-2">
          {records.length > 0 ? (
            records.map((record, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[33px] top-1 bg-blue-600 text-white p-1 rounded-full">
                  <Calendar size={14} />
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{record.name}</h4>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={FileText}
              title="No Records Yet"
              description="Upload medical records above to auto-generate the chronology using AI."
            />
          )}
        </div>
      </div>
    </div>
  );
}
