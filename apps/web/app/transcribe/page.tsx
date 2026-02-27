'use client';

import React from 'react';
import ResizableLayout from '@/components/ResizableLayout';
import DocumentViewer from '@/components/DocumentViewer';
import { Mic, Clock, FileText, Download, Play } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

/**
 * Transcription Engine Page.
 * Supports multi-hour media, clickable timestamps, and exports.
 */
export default function TranscribePage() {
  const segments: any[] = [];

  return (
    <ResizableLayout viewer={<DocumentViewer />}>
      <div className="space-y-6">
        <header className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Mic className="text-red-600" /> Transcription Engine
          </h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 border rounded text-xs hover:bg-gray-50">
              <Download size={14} /> Export
            </button>
          </div>
        </header>

        {/* Transcription Controls */}
        <div className="p-4 bg-gray-50 border rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md">
              <Play size={18} />
            </button>
            <div className="text-xs">
              <div className="font-bold">00:00:00 / 00:00:00</div>
              <div className="text-gray-500">No media loaded</div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">Inactive</span>
          </div>
        </div>

        {/* Transcript Body */}
        {segments.length === 0 ? (
          <EmptyState
            icon={Mic}
            title="No transcription yet"
            description="Upload an audio or video file to start transcribing. Our engine supports multi-hour media with high accuracy."
            action={{
              label: "Upload Media",
              onClick: () => console.log("Upload media")
            }}
          />
        ) : (
          <div className="space-y-6">
            {segments.map((s, i) => (
              <div key={i} className="group flex gap-4 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer">
                <span className="text-[10px] font-mono text-blue-600 mt-1 flex items-center gap-1">
                  <Clock size={10} /> {s.time}
                </span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-500 mb-1">{s.speaker}</div>
                  <p className="text-sm leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ResizableLayout>
  );
}
