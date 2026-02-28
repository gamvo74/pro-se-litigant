"use client";

import EmptyState from '@/components/EmptyState';

import React, { useState } from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import { Download, Search, Filter } from 'lucide-react';

export default function LegalResearchPage() {
  const [query, setQuery] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Advanced Legal Research</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
          <Download size={18} />
          <span>Export Results</span>
        </button>
      </div>

      {/* Mandatory Universal Upload */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Context Files (Upload specific documents to research against)</h3>
        <UniversalUpload />
      </div>

      {/* Research Interface */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search case law, statutes, or regulations..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            <Filter size={18} />
            Filters
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Search
          </button>
        </div>
        
        <div className="flex gap-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" defaultChecked />
            Federal
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" defaultChecked />
            State (All 50)
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" />
            Statutes
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-600">Recent Cases</h3>
        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
          <EmptyState
            icon={Search}
            title="No Results Yet"
            description="Enter a search query above to browse 50-state and federal case law."
          />
        </div>
      </div>
    </div>
  );
}
