import React from 'react';
import { 
  Plus, 
  Search, 
  Sparkles, 
  Layers, 
  Smartphone, 
  ShieldCheck, 
  DownloadCloud 
} from 'lucide-react';
import { AppItem } from '../types';

interface NavbarProps {
  onOpenAddApp: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  totalAppsCount: number;
  customAppsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddApp,
  searchTerm,
  onSearchChange,
  totalAppsCount,
  customAppsCount,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-1">
                  <span>🚀 Mabs Store ⚡</span>
                </span>
                <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> APK Hub
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Official Repository &bull; mabs777/mabs-store
              </p>
            </div>
          </div>

          {/* Mobile "＋ Add App" button */}
          <button
            id="mobile-add-app-btn"
            type="button"
            onClick={onOpenAddApp}
            className="md:hidden flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.97] text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add App</span>
          </button>
        </div>

        {/* Search bar + Desktop "＋ Add App" button */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-xl justify-end">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="search-apps-input"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search apps, developers, biographies..."
              className="w-full h-10 pl-9 pr-4 bg-zinc-900/90 border border-zinc-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Desktop Prominent "＋ Add App" Button */}
          <button
            id="header-add-app-btn"
            type="button"
            onClick={onOpenAddApp}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer shrink-0 border border-emerald-500/30"
          >
            <Plus className="w-4 h-4 text-emerald-100" />
            <span>＋ Add App</span>
          </button>
        </div>
      </div>
    </header>
  );
};
