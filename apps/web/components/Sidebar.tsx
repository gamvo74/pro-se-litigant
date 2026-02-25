import Link from 'next/link';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Search, 
  Gavel, 
  FileText, 
  History, 
  Settings,
  Shield,
  CreditCard
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Briefcase, label: 'Matters', href: '/matters' },
  { icon: MessageSquare, label: 'AI Assistant', href: '/ai-assistant' },
  { icon: Search, label: 'Legal Research', href: '/research' },
  { icon: Gavel, label: 'Mock Trial', href: '/mock-trial' },
  { icon: History, label: 'Medical Chronology', href: '/medical-chronology' },
  { icon: FileText, label: 'AI Transcribe', href: '/transcribe' },
  { icon: FileText, label: 'Legal Drafting', href: '/drafting' },
  { icon: Shield, label: 'AI Citator', href: '/citator' },
];

const secondaryItems = [
  { icon: CreditCard, label: 'Subscription', href: '/subscription' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="text-blue-500" />
          Pro Se Litigant
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Legal Partner</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
          >
            <item.icon size={20} className="group-hover:text-blue-400 transition-colors" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        {secondaryItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
          >
            <item.icon size={20} className="group-hover:text-blue-400 transition-colors" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-4 bg-slate-950/50">
        <div className="flex items-center gap-3 px-3 py-2 bg-blue-600/10 border border-blue-600/20 rounded-lg text-blue-400">
          <CreditCard size={18} />
          <div className="text-xs">
            <p className="font-bold">Premium Active</p>
            <Link href="/subscription" className="hover:underline">Manage Plan</Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
