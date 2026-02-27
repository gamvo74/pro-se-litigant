'use client';

import React from 'react';
import ResizableLayout from '@/components/ResizableLayout';
import DocumentViewer from '@/components/DocumentViewer';
import { ShieldCheck, AlertTriangle, XCircle, Search, Activity } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

/**
 * AI Citator Page.
 * Validates legal authority and detects negative treatment.
 */
export default function CitatorPage() {
  const citations: any[] = [];

  return (
    <ResizableLayout viewer={<DocumentViewer />}>
      <div className="space-y-6">
        <header className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-green-600" /> AI Citator
          </h1>
        </header>

        {/* Validator Input */}
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
          <label className="block text-sm font-bold text-green-800 mb-2">Validate Legal Authority</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter citation (e.g., 347 U.S. 483)..." 
              className="flex-1 p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold">
              Check
            </button>
          </div>
        </div>

        {/* Results Overview */}
        <div className="grid grid-cols-2 gap-4">
          {citations.length === 0 ? (
            <div className="col-span-2">
              <EmptyState
                icon={Activity}
                title="No citations validated"
                description="Enter a legal citation above to validate its current status and check for negative treatment."
                action={{
                  label: "Try Example",
                  onClick: () => console.log("Try example")
                }}
              />
            </div>
          ) : (
            citations.map((c, i) => (
              <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
                <div className="text-lg font-mono font-bold text-gray-800 mb-1">{c.citation}</div>
                <div className={`text-xs font-bold uppercase flex items-center gap-1 ${c.color}`}>
                  {c.status === 'GOOD_LAW' ? <ShieldCheck size={14}/> : <AlertTriangle size={14}/>}
                  {c.status}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Negative Treatment Feed */}
        {citations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Negative Treatment Detected</h2>
            <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
              <div className="text-sm font-bold text-amber-900 mb-1">Caution - Limited Treatment</div>
              <p className="text-xs text-amber-800 leading-relaxed">
                This case has been distinguished by the 4th Circuit in <span className="italic">Recent Case v. Power Co.</span> due to specific factual differences regarding...
              </p>
            </div>
          </div>
        )}
      </div>
    </ResizableLayout>
  );
}
