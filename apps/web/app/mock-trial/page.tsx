"use client";

import { useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Gavel, 
  User, 
  Mic, 
  Book, 
  MessageSquare,
  Upload,
  X,
  FileAudio
} from 'lucide-react';

const mockTrials = [
  {
    id: '1',
    title: 'Barden v. State Farm - Jurisdiction Challenge',
    status: 'Ready for Play',
    lastPractice: '2 days ago',
    transcript: 'Plaintiff argues lack of personal jurisdiction...',
    players: ['AI Judge', 'AI Opposing Counsel'],
  },
  {
    id: '2',
    title: 'Malveo Estate - Witness Testimony',
    status: 'Drafting Script',
    lastPractice: '1 week ago',
    transcript: 'Witness deposition regarding estate assets...',
    players: ['AI Judge'],
  },
];

export default function MockTrialPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          alert('Simulated upload complete. Actual backend integration coming soon!');
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mock Trial Simulator</h1>
          <p className="text-sm text-slate-500">Practice your arguments against AI Judge & Opposing Counsel.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
            accept="image/*,audio/*,video/*,.pdf,.docx,.txt,.csv,.xlsx,.json,.html,.md,.zip" // All supported types
            multiple // Allow multiple files for batch upload simulation
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            <Upload size={18} />
            Upload Files or Folder
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            <Plus size={20} />
            Create New Trial
          </button>
        </div>
      </div>

      {isUploading && (
        <div className="mx-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Upload size={20} className="animate-bounce" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Processing: {selectedFile?.name}</p>
              <p className="text-xs font-bold text-blue-600">{uploadProgress}%</p>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
          <button onClick={() => setIsUploading(false)} className="text-blue-400 hover:text-blue-600">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search mock trials..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Trial Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Players</th>
              <th className="px-6 py-4">Last Practice</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockTrials.map((trial) => (
              <tr key={trial.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                      <Gavel size={16} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">{trial.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{trial.status}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center -space-x-2">
                    {trial.players.map((player, index) => (
                      <span key={index} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                        {player.includes('AI') ? <Bot size={16} /> : <User size={16} />}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{trial.lastPractice}</td>
                <td className="px-6 py-4 text-right">
                  <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                    <Play size={16} /> Play
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
