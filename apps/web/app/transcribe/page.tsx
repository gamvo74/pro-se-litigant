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
  FileText,
  Upload,
  X,
  FileAudio,
  Bot // For speaker identification (if available in transcription)
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios'; // Import AxiosError for type checking

// Transcription Segment Type
interface TranscriptionSegment {
  id: number;
  start: number;
  end: number;
  speaker: string;
  text: string;
}

export default function TranscribePage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaDuration, setMediaDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Will be updated by polling
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<TranscriptionSegment[]>([]);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null); // For uploaded media preview
  const [transcriptionStatus, setTranscriptionStatus] = useState<string>('PENDING');

  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hardcoded matterId for now - MUST be replaced with dynamic value (e.g., from URL or user context)
  // For initial testing, ensure you have a matter created in your DB for the user.
  const MATTER_ID = 'your_matter_id_here'; 

  // --- Auto-scroll and media player controls ---
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
      setMediaDuration(audioRef.current.duration);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // --- Real Upload and Transcription Polling Logic ---
  const getAuthToken = () => {
    // TODO: Implement actual JWT token retrieval (e.g., from localStorage, context, or auth hook)
    // For now, return a placeholder. This MUST be replaced with a real token.
    return 'YOUR_JWT_TOKEN_HERE'; 
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setMediaBlobUrl(URL.createObjectURL(file)); // Create URL for local preview
    setIsUploading(true);
    setUploadProgress(0);
    setTranscription([]);
    setTranscriptionStatus('PENDING');

    const formData = new FormData();
    formData.append('file', file);

    const token = getAuthToken();
    if (token === 'YOUR_JWT_TOKEN_HERE') {
      alert('Please replace YOUR_JWT_TOKEN_HERE with a real token in transcribe/page.tsx and MATTER_ID with a valid matter.');
      setIsUploading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/${MATTER_ID}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'File upload failed');
      }

      const data = await response.json();
      setDocumentId(data.id); // Set the document ID to start polling for transcription
      // No longer simulating progress, actual progress will come from polling.

    } catch (error: any) {
      setIsUploading(false);
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  // Polling for Transcription Results
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout;

    const pollTranscription = async () => {
      if (!documentId) return;

      const token = getAuthToken();
      if (token === 'YOUR_JWT_TOKEN_HERE') return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/${documentId}/transcription`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        
        setTranscriptionStatus(data.transcriptionStatus);
        // Simulate progress based on status (real backend would send progress %)
        if (data.transcriptionStatus === 'PROCESSING') {
          setUploadProgress(50); 
        } else if (data.transcriptionStatus === 'COMPLETED') {
          setUploadProgress(100);
        }

        if (data.transcriptionStatus === 'COMPLETED' && data.transcriptionText) {
          const parsedTranscription = JSON.parse(data.transcriptionText);
          // Assuming parsedTranscription.segments contains what we need from OpenAI verbose_json
          setTranscription(parsedTranscription.segments.map((s: any, index: number) => ({
            id: index, // Use index if OpenAI doesn't provide segment ID directly
            start: s.start,
            end: s.end,
            speaker: s.speaker || `Speaker ${s.id || 0}`, // Whisper doesn't do speaker diarization by default, might need external lib
            text: s.text.trim(),
          })));
          setMediaDuration(parsedTranscription.duration || audioRef.current?.duration || 0);
          setIsUploading(false); // Stop progress once transcription is done
          clearInterval(pollingInterval);
        } else if (data.transcriptionStatus === 'FAILED') {
          setIsUploading(false);
          alert('Transcription failed.');
          clearInterval(pollingInterval);
        }
      } catch (error) {
        console.error('Error fetching transcription:', error);
        setIsUploading(false);
        alert('Error fetching transcription status.');
        clearInterval(pollingInterval);
      }
    };

    if (documentId && isUploading) {
      pollingInterval = setInterval(pollTranscription, 3000); // Poll every 3 seconds
    }

    return () => clearInterval(pollingInterval); // Cleanup interval
  }, [documentId, isUploading]);

  const displayStatusMessage = () => {
    switch (transcriptionStatus) {
      case 'PENDING':
        return 'Waiting to start transcription...';
      case 'PROCESSING':
        return 'Transcribing in progress...';
      case 'COMPLETED':
        return 'Transcription complete!';
      case 'FAILED':
        return 'Transcription failed!';
      default:
        return 'Unknown status';
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
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
            accept="audio/*,video/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            <Upload size={18} />
            Upload Files or Folder
          </button>
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

      {isUploading && (transcriptionStatus !== 'COMPLETED') && (
        <div className="mx-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Upload size={20} className="animate-bounce" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-bold text-blue-900 dark:text-blue-100">
                {selectedFile ? `Uploading & Processing: ${selectedFile.name}` : 'Processing file...'}
              </p>
              <p className="text-xs font-bold text-blue-600">{transcriptionStatus === 'COMPLETED' ? '100%' : uploadProgress > 0 ? `${uploadProgress}%` : ''}</p>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">{displayStatusMessage()}</p>
          </div>
          <button onClick={() => {setIsUploading(false); setTranscriptionStatus('PENDING');}} className="text-blue-400 hover:text-blue-600">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex-1 flex gap-6 overflow-hidden px-4">
        {/* Left: Media Player & Controls */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-white aspect-video relative overflow-hidden group">
            {mediaBlobUrl ? (
              <audio 
                controls 
                ref={audioRef} 
                onTimeUpdate={handleTimeUpdate} 
                onLoadedMetadata={() => audioRef.current && setMediaDuration(audioRef.current.duration)}
                src={mediaBlobUrl} 
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                playbackRate={playbackSpeed}
              ></audio>
            ) : (
              <>
                <Volume2 size={64} className="text-blue-500/20 mb-4" />
                <p className="font-bold">Upload audio/video to begin</p>
              </>
            )}
            <p className="font-bold truncate max-w-full px-4">{selectedFile ? selectedFile.name : 'No file selected'}</p>
            <p className="text-xs text-slate-500">Matter: Barden v. State Farm</p>
            
            {/* Minimalist Player UI Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-12 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full bg-white/20 h-1.5 rounded-full mb-4 cursor-pointer relative" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                seek((x / rect.width) * mediaDuration);
              }}>
                <div 
                  className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" 
                  style={{ width: `${(currentTime / mediaDuration) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono">{formatTime(currentTime)}</span>
                <div className="flex items-center gap-4">
                  <SkipBack size={20} className="cursor-pointer hover:text-blue-400" onClick={() => seek(currentTime - 5)} />
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
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>
                  <SkipForward size={20} className="cursor-pointer hover:text-blue-400" onClick={() => seek(currentTime + 5)} />
                </div>
                <span className="text-[10px] font-mono">{formatTime(mediaDuration)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Settings</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Playback Speed</span>
              <select 
                value={playbackSpeed} 
                onChange={(e) => {
                  setPlaybackSpeed(Number(e.target.value));
                  if(audioRef.current) audioRef.current.playbackRate = Number(e.target.value);
                }}
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
              <span className="flex items-center gap-1"><User size={12} /> {new Set(transcription.map(t => t.speaker)).size} Speakers Identified</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {formatTime(mediaDuration)} Total Duration</span>
            </div>
          </header>

          <div 
            ref={transcriptRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
          >
            {transcription.length > 0 ? (
              transcription.map((line) => {
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
              })
            ) : (
              <div className="text-center text-slate-500 mt-12">
                <p>Upload an audio or video file to get started with transcription.</p>
                {isUploading && <p className="mt-2 text-blue-500">{displayStatusMessage()}</p>}
              </div>
            )}
          </div>

          <footer className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <p>Sync Latency: &lt;100ms</p>
              <p>Autosave Active: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}