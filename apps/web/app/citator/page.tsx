"use client";

import React, { useState } from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import { Download, ShieldCheck, AlertTriangle, FileText } from 'lucide-react';

export default function AICitatorPage() {
  const [citation, setCitation] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">AI Citator & Authority Check</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Mandatory Universal Upload */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Upload Brief/Memo for Bulk Analysis</h3>
        <UniversalUpload multiple={false} />
      </div>

      {/* Manual Input */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-semibold mb-4">Check Single Citation</h3>
        <div className="flex gap-4">
          <input 
            type="text"
            value={citation}
            onChange={(e) => setCitation(e.target.value)}
            placeholder="e.g., Miranda v. Arizona, 384 U.S. 436 (1966)"
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Analyze
          </button>
        </div>
      </div>

      {/* Results Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-green-600" />
            <h4 className="font-bold text-green-800 dark:text-green-200">Good Law</h4>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Citations confirmed as valid and binding in selected jurisdiction.
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-yellow-600" />
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Warnings</h4>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Potential negative treatment or distinguishing cases found.
          </p>
        </div>
      </div>
    </div>
  );
}
