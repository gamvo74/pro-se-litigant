"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Search, 
  Download, 
  Maximize2, 
  Clock,
  User,
  Volume2,
  FileText
} from 'lucide-react';

// Mock transcription data for demonstration
const mockTranscript = [
  { id: 1, start: 0, end: 5, speaker: "Speaker 1", text: "Welcome to the evidentiary hearing for Barden versus State Farm." },
  { id: 2, start: 5, end: 12, speaker: "Speaker 2", text: "Thank you, Your Honor. We are here today to discuss the lack of personal jurisdiction as outlined in our recent motion." },
  { id: 3, start: 12, end: 18, speaker: "Speaker 1", text: "Proceed. Please state your primary grounds for this challenge." },
  { id: 4, start: 18, end: 25, speaker: "Speaker 2", text: "The defendant has no minimum contacts with the state of North Carolina, as required by the long-arm statute." },
  { id: 5, start: 25, end: 32, speaker: "Speaker 3", text: "Objection, Your Honor. The defendant has maintained an office in Charlotte for over five years." },
  { id: 6, start: 32, end: 40, speaker: "Speaker 1", text: "Overruled. I will allow the defense to finish their opening statement before hearing your rebuttal." },
];

export default function TranscribePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(40);
  const [searchQuery, setSearchQuery] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (activeLineRef.current && transcriptRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v < 10 ? "0" + v : v).join(":");
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-6 -m-4">
      <div className="flex justify-between items-center px-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Transcribe (Sync Mode)</h1>
          <p className="text-sm text-slate-500">Real-time synchronized media player and transcript.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search transcript..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            <Download size={18} />
            Export SRT/VTT/PDF
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden px-4">
        {/* Left: Media Player & Controls */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-white aspect-video relative overflow-hidden group">
            <Volume2 size={64} className="text-blue-500/20 mb-4" />
            <p className="font-bold">Evidentiary_Hearing_022426.mp3</p>
            <p className="text-xs text-slate-500">Matter: Barden v. State Farm</p>
            
            {/* Minimalist Player UI Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-12 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full bg-white/20 h-1.5 rounded-full mb-4 cursor-pointer relative" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                seek((x / rect.width) * duration);
              }}>
                <div 
                  className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono">{formatTime(currentTime)}</span>
                <div className="flex items-center gap-4">
                  <SkipBack size={20} className="cursor-pointer hover:text-blue-400" onClick={() => seek(currentTime - 5)} />
                  <button 
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      // In real app: audioRef.current.play/pause
                    }}
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>
                  <SkipForward size={20} className="cursor-pointer hover:text-blue-400" onClick={() => seek(currentTime + 5)} />
                </div>
                <span className="text-[10px] font-mono">{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Settings</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Playback Speed</span>
              <select 
                value={playbackSpeed} 
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-bold p-2"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1.0x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2.0x</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto-Scroll</span>
              <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Synchronized Transcript */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <header className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-500" />
              <h4 className="font-bold text-sm">Transcript (Sync Active)</h4>
            </div>
            <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1"><User size={12} /> 3 Speakers Identified</span>
              <span className="flex items-center gap-1"><Clock size={12} /> 00:40 Total Duration</span>
            </div>
          </header>

          <div 
            ref={transcriptRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
          >
            {mockTranscript.map((line) => {
              const isActive = currentTime >= line.start && currentTime < line.end;
              const isMatch = searchQuery && line.text.toLowerCase().includes(searchQuery.toLowerCase());

              return (
                <div 
                  key={line.id} 
                  ref={isActive ? activeLineRef : null}
                  className={`flex gap-6 transition-all duration-300 rounded-xl p-4 ${
                    isActive ? 'bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-100 dark:ring-blue-800 shadow-sm' : ''
                  } ${isMatch ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                >
                  <button 
                    onClick={() => seek(line.start)}
                    className={`text-[11px] font-mono font-bold w-20 flex-shrink-0 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500'
                    }`}
                  >
                    [{formatTime(line.start)}]
                  </button>
                  <div className="space-y-1 flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    }`}>
                      {line.speaker}
                    </p>
                    <p className={`text-sm leading-relaxed transition-colors ${
                      isActive ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {line.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <footer className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <p>Sync Latency: &lt;100ms</p>
              <p>Autosave Active: 12:45 PM</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
