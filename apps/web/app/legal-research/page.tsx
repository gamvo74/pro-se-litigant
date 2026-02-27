'use client';

import React from 'react';
import ResizableLayout from '@/components/ResizableLayout';
import DocumentViewer from '@/components/DocumentViewer';
import { Search, Filter, BookOpen, Quote } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

/**
 * Legal Research Engine Page.
 * Supports US Federal/50 State search with Boolean and filters.
 */
export default function LegalResearchPage() {
  const results: any[] = [];

  return (
    <ResizableLayout viewer={<DocumentViewer />}>
      <div className="space-y-6">
        <header className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="text-indigo-600" /> Legal Research
          </h1>
        </header>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search US Federal & 50 States Case Law..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 p-3 bg-gray-50 border rounded-lg overflow-x-auto">
          <button className="flex items-center gap-1 text-xs px-2 py-1 border rounded bg-white"><Filter size={12}/> Federal</button>
          <button className="flex items-center gap-1 text-xs px-2 py-1 border rounded bg-white">All States</button>
          <button className="flex items-center gap-1 text-xs px-2 py-1 border rounded bg-white">Appellate</button>
          <button className="flex items-center gap-1 text-xs px-2 py-1 border rounded bg-white">Statutes</button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No results yet"
              description="Enter a query above to search across US Federal and 50 States case law, statutes, and more."
              action={{
                label: "Try Example Search",
                onClick: () => console.log("Example search")
              }}
            />
          ) : (
            results.map((r, i) => (
              <div key={i} className="p-4 border rounded-lg hover:border-indigo-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-md font-bold text-indigo-900">{r.name}</h3>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">{r.weight}</span>
                </div>
                <div className="text-xs text-gray-500 space-x-4">
                  <span className="font-mono font-bold text-gray-700">{r.citation}</span>
                  <span>{r.court}</span>
                  <span>{r.year}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">
                    <Quote size={10} /> Insert Citation
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ResizableLayout>
  );
}
