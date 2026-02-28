"use client";

import EmptyState from '@/components/EmptyState';

import { useState } from 'react';
import { 
  Briefcase, 
  MessageSquare, 
  Gavel, 
  Clock, 
  ArrowRight,
  Plus,
  FileText
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Active Matters', value: '0', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'AI Sessions', value: '0', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Documents', value: '0', icon: FileText, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Upcoming Deadlines', value: '0', icon: Clock, color: 'text-red-600', bg: 'bg-red-100' },
];

type Matter = { id: string; title: string; status: string; date: string };

export default function Dashboard() {
  const [recentMatters] = useState<Matter[]>([]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your Legal Command Center</h1>
        <p className="text-slate-500">Overview of your ongoing cases and legal research.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Matters */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Matters</h3>
            <Link href="/matters" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
            {recentMatters.length > 0 ? (
              recentMatters.map((matter) => (
                <div key={matter.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{matter.title}</p>
                      <p className="text-xs text-slate-500">{matter.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full">
                      {matter.status}
                    </span>
                    <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={Briefcase}
                title="No Recent Matters"
                description="Create your first matter to start tracking your legal cases."
                action={{ label: 'Create Matter', onClick: () => {} }}
              />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Tools</h3>
          <div className="grid grid-cols-1 gap-4">
            <button className="flex items-center gap-4 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 group">
              <div className="bg-white/20 p-2 rounded-lg">
                <MessageSquare size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">AI Assistant</p>
                <p className="text-xs text-blue-100">Draft a motion or brief</p>
              </div>
            </button>
            <button className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-900 dark:text-white rounded-xl transition-all group">
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors">
                <Gavel size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">Mock Trial</p>
                <p className="text-xs text-slate-500">Practice your oral argument</p>
              </div>
            </button>
            <button className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-900 dark:text-white rounded-xl transition-all group">
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors">
                <Clock size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">Medical Chronology</p>
                <p className="text-xs text-slate-500">Analyze medical records</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
