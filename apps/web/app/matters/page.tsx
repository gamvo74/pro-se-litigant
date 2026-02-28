"use client";

import EmptyState from '@/components/EmptyState';

import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Briefcase, FileText } from 'lucide-react';

type Matter = { id: string; title: string; caseNumber: string; status: string; documents: number; lastActivity: string };

export default function MattersPage() {
  const [matters] = useState<Matter[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Legal Matters</h1>
          <p className="text-slate-500 text-sm">Organize and manage your legal cases.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
          <Plus size={20} />
          Create New Matter
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search matters, case numbers..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 transition-colors">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Matter Name</th>
              <th className="px-6 py-4">Case Number</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Documents</th>
              <th className="px-6 py-4">Last Activity</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {matters.map((matter) => (
              <tr key={matter.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                      <Briefcase size={16} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{matter.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-mono">{matter.caseNumber}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${
                    matter.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    matter.status === 'Researching' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {matter.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-slate-400" />
                    {matter.documents} files
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{matter.lastActivity}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {matters.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    icon={Briefcase}
                    title="No Matters Yet"
                    description="Create your first matter to start organizing your legal cases."
                    action={{ label: 'Create New Matter', onClick: () => {} }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
