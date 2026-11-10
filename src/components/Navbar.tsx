import React from 'react';
import { Zap } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  isLive: boolean;
  onScrollTo: (id: string) => void;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLive, onScrollTo, onNavigate }) => {
  const handleNavClick = (path: string, sectionId?: string) => {
    const isHomePage = window.location.pathname === '/' || window.location.pathname.startsWith('/convert/');

    if (!isHomePage) {
      if (onNavigate) {
        window.history.pushState({}, '', path);
        onNavigate(path);
        if (sectionId) {
          setTimeout(() => {
            onScrollTo(sectionId);
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.location.href = sectionId ? `${path}#${sectionId}` : path;
      }
    } else if (sectionId) {
      onScrollTo(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="/"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              onNavigate('/');
            }
          }}
          className="cursor-pointer"
        >
          <Logo size="md" />
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <button
            onClick={() => handleNavClick('/', 'converter-section')}
            className="hover:text-indigo-400 transition"
          >
            Converter
          </button>
          <button
            onClick={() => handleNavClick('/', 'chart-section')}
            className="hover:text-indigo-400 transition"
          >
            Live Chart
          </button>
          <a
            href="/guides"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                window.history.pushState({}, '', '/guides');
                onNavigate('/guides');
              }
            }}
            className="hover:text-indigo-400 transition"
          >
            Guides
          </a>
          <a
            href="/about"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                window.history.pushState({}, '', '/about');
                onNavigate('/about');
              }
            }}
            className="hover:text-indigo-400 transition"
          >
            About
          </a>
          <a
            href="/contact"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                window.history.pushState({}, '', '/contact');
                onNavigate('/contact');
              }
            }}
            className="hover:text-indigo-400 transition"
          >
            Contact
          </a>
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

          <button
            onClick={() => handleNavClick('/', 'converter-section')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-sm cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Convert Free</span>
          </button>
        </div>

      </div>
    </header>
  );
};
