import EmptyState from '@/components/EmptyState';

import { Check, Shield, Star, Zap, Globe, FileSearch } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started and basic legal help.',
    features: [
      'Basic AI Chat (GPT-3.5/4o-mini)',
      '1 Active Matter',
      '1 File Upload (Max 6MB)',
      'Basic Legal Research',
      'PDF/DOCX support only'
    ],
    buttonText: 'Current Plan',
    buttonClass: 'bg-slate-100 text-slate-400 cursor-not-allowed',
    highlight: false
  },
  {
    name: 'Premium',
    price: '$15',
    period: '/year',
    description: 'Complete legal arsenal for serious pro se litigants.',
    features: [
      'Advanced AI Assistant (GPT-4 Turbo)',
      'Unlimited Matters & Folders',
      'Unlimited File Size & Batch Uploads',
      'Full Federal & State Research DB',
      'Mock Trial & Medical Chronology',
      'AI Citator & Legal Drafting Canvas',
      'All Media Formats + Transcription',
      'Priority Email Support'
    ],
    buttonText: 'Upgrade to Premium',
    buttonClass: 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20',
    highlight: true
  }
];

export default function SubscriptionPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Get the professional legal tools you need at a price that makes sense. Choose the plan that fits your case.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 transition-all ${
              plan.highlight 
                ? 'border-blue-600 shadow-2xl scale-105 z-10' 
                : 'border-slate-100 dark:border-slate-800 shadow-sm'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                Recommended
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
                </div>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">What's included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        <Check size={14} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all active:scale-[0.98] ${plan.buttonClass}`}>
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-10 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 text-center">Premium Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mx-auto md:mx-0">
              <Shield size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">AI Citator</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Validate case citations and detect negative treatment in real-time.</p>
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mx-auto md:mx-0">
              <FileSearch size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Legal Research</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Access a comprehensive database of Federal and State appellate opinions.</p>
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 mx-auto md:mx-0">
              <Zap size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Transcription</h4>
            <p className="text-xs text-slate-500 leading-relaxed">AI-powered transcription for all media formats with speaker diarization.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
