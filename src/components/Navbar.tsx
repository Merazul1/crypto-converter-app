import React from 'react';
import { Zap } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  isLive: boolean;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLive, onScrollTo }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer"
        >
          <Logo size="md" />
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <button
            onClick={() => onScrollTo('converter-section')}
            className="hover:text-indigo-400 transition"
          >
            Converter
          </button>
          <button
            onClick={() => onScrollTo('chart-section')}
            className="hover:text-indigo-400 transition"
          >
            Live Chart
          </button>
          <button
            onClick={() => onScrollTo('matrix-section')}
            className="hover:text-indigo-400 transition"
          >
            Global Matrix
          </button>
          <button
            onClick={() => onScrollTo('faq-section')}
            className="hover:text-indigo-400 transition"
          >
            FAQ
          </button>
        </nav>

        {/* Live status badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300 font-medium hidden sm:inline">
              {isLive ? 'Live Feed Connected' : 'Cached Baseline'}
            </span>
            <span className="text-slate-300 font-medium sm:hidden">
              Live
            </span>
          </div>

          <a
            href="#converter-section"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Convert Free</span>
          </a>
        </div>

      </div>
    </header>
  );
};
