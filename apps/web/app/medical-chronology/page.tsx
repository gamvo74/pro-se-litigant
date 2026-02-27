"use client";

import React from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import { Download, Plus, Calendar } from 'lucide-react';

export default function MedicalChronologyPage() {
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
        <UniversalUpload multiple={true} allowFolders={true} />
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-semibold mb-4">Timeline View</h3>
        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8 pl-6 py-2">
          {/* Example Item */}
          <div className="relative">
            <div className="absolute -left-[33px] top-1 bg-blue-600 text-white p-1 rounded-full">
              <Calendar size={14} />
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">Emergency Room Visit</h4>
                  <p className="text-sm text-slate-500">Memorial Hospital - Dr. Smith</p>
                </div>
                <span className="text-sm font-medium text-slate-500">Oct 12, 2023</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wide">Diagnosis</span>
                  <span className="font-medium">Acute lumbar strain (ICD-10 S39.012A)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wide">Procedure</span>
                  <span className="font-medium">X-Ray Lumbar Spine</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-slate-400 italic text-sm py-4">
            Upload records above to auto-generate chronology using AI.
          </div>
        </div>
      </div>
    </div>
  );
}
