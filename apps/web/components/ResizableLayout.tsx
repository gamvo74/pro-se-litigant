'use client';

import React, { useState } from 'react';

/**
 * Resizable split-screen layout for Pro Se Litigant.
 * LEFT: Feature Interface
 * RIGHT: Resizable Document Viewer
 */
export default function ResizableLayout({ children, viewer }: { children: React.ReactNode; viewer: React.ReactNode }) {
  const [leftWidth, setLeftWidth] = useState(50); // percentage

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-black font-sans">
      <div style={{ width: `${leftWidth}%` }} className="h-full overflow-y-auto border-r border-gray-200 p-6">
        {children}
      </div>
      
      {/* Resizer Handle */}
      <div 
        className="w-1 cursor-col-resize bg-gray-100 hover:bg-blue-500 transition-colors"
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startWidth = leftWidth;
          const onMouseMove = (e: MouseEvent) => {
            const delta = ((e.clientX - startX) / window.innerWidth) * 100;
            setLeftWidth(Math.min(Math.max(startWidth + delta, 20), 80));
          };
          const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }}
      />

      <div style={{ width: `${100 - leftWidth}%` }} className="h-full bg-gray-50 overflow-hidden">
        {viewer}
      </div>
    </div>
  );
}
