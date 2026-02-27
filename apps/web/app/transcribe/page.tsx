"use client";

import { useState, useRef, useEffect } from 'react';
import UniversalUpload from '@/components/UniversalUpload';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Search, 
  Download, 
  Clock,
  User,
  Volume2,
  FileText,
  X
} from 'lucide-react';

// Transcription Segment Type
interface TranscriptionSegment {
  id: number;
  start: number;
  end: number;
  speaker: string;
  text: string;
}

export default function TranscribePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaDuration, setMediaDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<TranscriptionSegment[]>([]);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const [transcriptionStatus, setTranscriptionStatus] = useState<string>('PENDING');

  const audioRef = useRef<HTMLAudioElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // --- Auto-scroll and media player controls ---
  useEffect(() => {
    if (activeLineRef.current) {
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
      setMediaDuration(audioRef.current.duration);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleUploadComplete = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]; // Take the first one for now
      setSelectedFile(file);
      setMediaBlobUrl(URL.createObjectURL(file));
      setIsUploading(true);
      // Simulate transcription process
      setTimeout(() => {
        setIsUploading(false);
        setTranscriptionStatus('COMPLETED');
        // Mock Transcription Data
        setTranscription([
          { id: 1, start: 0, end: 5, speaker: 'Speaker 1', text: 'Please state your name for the record.' },
          { id: 2, start: 5, end: 10, speaker: 'Speaker 2', text: 'My name is John Doe.' },
          { id: 3, start: 10, end: 20, speaker: 'Speaker 1', text: 'Thank you. Where were you on the night of October 12th?' },
          { id: 4, start: 20, end: 35, speaker: 'Speaker 2', text: 'I was at home watching television with my wife.' },
        ]);
      }, 2000);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <div className="flex justify-between items-center shrink-0">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {!mediaBlobUrl && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 shrink-0">
          <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Upload Audio/Video Source</h3>
          <UniversalUpload onUploadComplete={handleUploadComplete} multiple={false} allowFolders={false} />
        </div>
      )}

      {mediaBlobUrl && (
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Left: Media Player & Controls */}
          <div className="w-1/3 flex flex-col gap-4 overflow-y-auto">
            <div className="bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center text-white aspect-video relative overflow-hidden group shadow-lg">
                <audio 
                  ref={audioRef} 
                  onTimeUpdate={handleTimeUpdate} 
                  onLoadedMetadata={() => audioRef.current && setMediaDuration(audioRef.current.duration)}
                  src={mediaBlobUrl} 
                  className="hidden"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                ></audio>
                
                <div className="text-center mb-4">
                   <Volume2 size={48} className="mx-auto mb-2 opacity-50" />
                   <p className="font-bold truncate max-w-[200px]">{selectedFile?.name}</p>
                </div>

                {/* Custom Controls */}
                <div className="flex items-center gap-4 mb-4">
                  <SkipBack size={24} className="cursor-pointer hover:text-blue-400" onClick={() => seek(currentTime - 5)} />
                  <button 
                    onClick={() => {
                      if (audioRef.current) {
                        if (isPlaying) {
                          audioRef.current.pause();
                        } else {
                          audioRef.current.play();
                        }
                        setIsPlaying(!isPlaying);
                      }
                    }}
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </button>
                  <SkipForward size={24} className="cursor-pointer hover:text-blue-400" onClick={() => seek(currentTime + 5)} />
                </div>
                
                <div className="w-full px-4">
                  <div className="w-full bg-slate-700 h-1 rounded-full cursor-pointer relative" onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      seek((x / rect.width) * mediaDuration);
                    }}>
                    <div 
                      className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" 
                      style={{ width: `${(currentTime / mediaDuration) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 font-mono text-slate-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(mediaDuration)}</span>
                  </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4 shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400">Settings</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Playback Speed</span>
                <select 
                  value={playbackSpeed} 
                  onChange={(e) => {
                    setPlaybackSpeed(Number(e.target.value));
                    if(audioRef.current) audioRef.current.playbackRate = Number(e.target.value);
                  }}
                  className="bg-slate-50 dark:bg-slate-800 border-none rounded text-sm font-bold p-1"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1.0x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2.0x</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right: Synchronized Transcript */}
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <header className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                <h4 className="font-bold text-sm">Transcript</h4>
              </div>
              <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><User size={12} /> {new Set(transcription.map(t => t.speaker)).size} Speakers</span>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
              {transcription.length > 0 ? (
                transcription.map((line) => {
                  const isActive = currentTime >= line.start && currentTime < line.end;
                  const isMatch = searchQuery && line.text.toLowerCase().includes(searchQuery.toLowerCase());
                  
                  if (searchQuery && !isMatch) return null;

                  return (
                    <div 
                      key={line.id} 
                      ref={isActive ? activeLineRef : null}
                      className={`flex gap-4 transition-all duration-300 rounded-lg p-3 ${
                        isActive ? 'bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-100 dark:ring-blue-800 shadow-sm' : ''
                      } ${isMatch ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                    >
                      <button 
                        onClick={() => seek(line.start)}
                        className={`text-[11px] font-mono font-bold w-16 flex-shrink-0 pt-1 transition-colors ${
                          isActive ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500'
                        }`}
                      >
                        {formatTime(line.start)}
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
                })
              ) : (
                 <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <p>Generating transcript...</p>
                 </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
