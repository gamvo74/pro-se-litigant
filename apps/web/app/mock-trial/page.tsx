"use client";

import EmptyState from '@/components/EmptyState';

import React, { useState } from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import { Download, Gavel, User, Mic, Play, Settings } from 'lucide-react';

export default function MockTrialPage() {
  const [role, setRole] = useState('plaintiff');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Mock Trial Simulator</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
            <Settings size={18} />
            Config
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
            <Download size={18} />
            Export Transcript
          </button>
        </div>
      </div>

      {/* Mandatory Universal Upload */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Case Files (Evidence, Pleadings)</h3>
        <UniversalUpload multiple={true} allowFolders={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold mb-4 text-slate-700 dark:text-slate-200">Simulation Setup</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Your Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setRole('plaintiff')}
                    className={`px-3 py-2 text-sm rounded border ${role === 'plaintiff' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    Plaintiff / Pro Se
                  </button>
                  <button 
                    onClick={() => setRole('defendant')}
                    className={`px-3 py-2 text-sm rounded border ${role === 'defendant' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    Defendant
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">AI Participants</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Gavel size={16} className="text-slate-500" />
                      <span className="text-sm font-medium">Judge</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-slate-500" />
                      <span className="text-sm font-medium">Opposing Counsel</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Play size={18} />
                Start Simulation
              </button>
            </div>
          </div>
        </div>

        {/* Simulation Area (Placeholder) */}
        <div className="col-span-2 bg-slate-900 rounded-lg shadow-inner flex flex-col relative overflow-hidden h-[500px]">
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent z-10 flex justify-between text-white/80">
            <span className="font-mono text-xs">COURTROOM_SIM_V1.0</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold">LIVE</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <Gavel size={64} className="mx-auto mb-4 opacity-20" />
              <p>Press "Start Simulation" to begin courtroom session.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-800/80 backdrop-blur border-t border-slate-700 flex items-center gap-3">
             <button className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors shadow-lg">
               <Mic size={20} />
             </button>
             <input 
               type="text" 
               placeholder="Type your objection or argument here..." 
               className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
