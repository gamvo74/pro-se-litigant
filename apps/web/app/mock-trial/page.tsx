'use client';

import React, { useState } from 'react';
import ResizableLayout from '@/components/ResizableLayout';
import DocumentViewer from '@/components/DocumentViewer';
import { Gavel, MessageSquare, ShieldAlert, Play } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

/**
 * Mock Hearing & Trial Simulator Page.
 * Features AI Judge and Opposing Counsel interaction.
 */
export default function MockTrialPage() {
  const [messages, setMessages] = useState<any[]>([]);

  return (
    <ResizableLayout 
      viewer={<DocumentViewer />}
    >
      <div className="space-y-6">
        <header className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Gavel className="text-blue-600" /> Trial Simulator
          </h1>
          <button className="px-4 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800">
            Export Transcript
          </button>
        </header>

        {/* Courtroom Feed */}
        <div className="space-y-4 h-[60vh] overflow-y-auto pr-2">
          {messages.length === 0 ? (
            <EmptyState
              icon={Gavel}
              title="Simulator Ready"
              description="Start a mock trial session to practice your case. Interact with an AI Judge and Opposing Counsel."
              action={{
                label: "Start Session",
                onClick: () => setMessages([{ role: 'JUDGE', content: 'The court is now in session. Counsel, you may proceed.' }])
              }}
            />
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`p-4 rounded-lg border ${m.role === 'JUDGE' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${m.role === 'JUDGE' ? 'bg-amber-600 text-white' : 'bg-gray-600 text-white'}`}>
                    {m.role}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{m.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded text-sm hover:bg-red-50 font-bold uppercase">
              <ShieldAlert size={16} /> Objection
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50 font-bold uppercase">
              Respond
            </button>
          </div>
          <div className="relative">
            <textarea 
              placeholder="Type your testimony or argument here..." 
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            />
            <button className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg">
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </div>
    </ResizableLayout>
  );
}
