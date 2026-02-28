import { 
  Send, 
  Paperclip, 
  Bot, 
  User, 
  Scale, 
  FileText, 
  Download,
  Maximize2,
  ChevronRight,
  Search
} from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export default function AiAssistantPage() {
  return (
    <div className="h-[calc(100vh-12rem)] flex gap-4 overflow-hidden -m-4">
      {/* Left Pane: Chat Interface */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Legal Assistant</h3>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Online | GPT-4 Turbo
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors">
              <Download size={18} />
            </button>
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors">
              <Maximize2 size={18} />
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Bot size={18} />
            </div>
            <div className="space-y-2 max-w-[85%]">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                Hello! I am your AI Legal Partner. I can help you draft motions, research case law, or analyze your documents. How can I assist you with your matter today?
              </div>
              <p className="text-[10px] text-slate-400 font-medium ml-1">AI Assistant • 12:45 PM</p>
            </div>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 flex-shrink-0">
              <User size={18} />
            </div>
            <div className="space-y-2 max-w-[85%] text-right">
              <div className="p-4 bg-blue-600 text-white rounded-2xl rounded-tr-none text-sm leading-relaxed text-left">
                I need to draft a Motion to Dismiss based on lack of personal jurisdiction for my North Carolina case. Can you find relevant statutes?
              </div>
              <p className="text-[10px] text-slate-400 font-medium mr-1">You • 12:46 PM</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="relative group">
            <textarea 
              placeholder="Ask anything... (e.g., 'Analyze the uploaded complaint for inconsistencies')"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 min-h-[100px] resize-none transition-all text-sm"
            />
            <div className="absolute right-3 bottom-3 flex gap-2">
              <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors">
                <Paperclip size={20} />
              </button>
              <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20">
                <Send size={20} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-slate-400 text-center uppercase tracking-widest font-semibold">
            Press Enter to send • Ctrl + Shift + U to upload
          </p>
        </div>
      </div>

      {/* Right Pane: Document Viewer Placeholder */}
      <div className="w-[450px] hidden lg:flex flex-col bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <header className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Document Viewer</h4>
          </div>
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-500">
              <Search size={16} />
            </button>
            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-500">
              <Maximize2 size={16} />
            </button>
          </div>
        </header>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <EmptyState
            icon={FileText}
            title="No Document Selected"
            description="Select a document from the matter or upload a new one to view it side-by-side with the AI Assistant."
            action={{ label: 'Upload Files', onClick: () => {} }}
          />
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            <span>Current Matter Files</span>
            <ChevronRight size={14} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
              <div className="w-8 h-8 rounded bg-red-50 text-red-600 flex items-center justify-center text-[10px] font-bold">PDF</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">Complaint_Final.pdf</p>
                <p className="text-[10px] text-slate-400">1.2 MB • Updated 2h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
