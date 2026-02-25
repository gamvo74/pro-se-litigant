import { Gavel, Mic, Users, MessageSquare, Play, Info } from 'lucide-react';

export default function MockTrialPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mock Trial Simulator</h1>
          <p className="text-slate-500">Practice your arguments and receive real-time feedback from an AI Judge.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
          <Play size={20} fill="currentColor" />
          Start Simulation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl aspect-video relative overflow-hidden border-4 border-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-6 border-2 border-slate-700">
                <Gavel size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">The Honorable AI Judge</h2>
              <p className="text-slate-400 max-w-md mx-auto">Ready to hear your opening statement or oral argument. Click 'Start Simulation' to begin.</p>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Live</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-slate-800/80 backdrop-blur rounded-full text-white hover:bg-slate-700 border border-slate-700">
                  <Mic size={20} />
                </button>
                <button className="p-3 bg-slate-800/80 backdrop-blur rounded-full text-white hover:bg-slate-700 border border-slate-700">
                  <Users size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Info size={18} className="text-blue-500" />
              Simulation Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Plaintiff Counsel</option>
                  <option>Defendant Counsel</option>
                  <option>Witness (Direct/Cross)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Judge Persona</label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Strict & Formal</option>
                  <option>Helpful & Instructive</option>
                  <option>Skeptical & Challenging</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden shadow-sm">
            <header className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-500" />
              <h3 className="font-bold text-sm">Trial Log</h3>
            </header>
            <div className="flex-1 p-4 space-y-4 min-h-[400px]">
              <div className="text-center py-10 text-slate-400">
                <p className="text-sm italic">"The court is now in session..."</p>
                <p className="text-xs mt-2">Logs will appear here during your simulation.</p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <button className="w-full py-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-300 transition-colors uppercase tracking-widest">
                Export Transcript
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
