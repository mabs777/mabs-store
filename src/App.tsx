import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  Smartphone, 
  FolderPlus, 
  Info,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppItem } from './types';
import { INITIAL_APPS, DEFAULT_CATEGORIES } from './data/defaultApps';
import { getStoredCustomApps, saveCustomApp, deleteStoredApp, updateStoredApp } from './utils/storage';
import { Navbar } from './components/Navbar';
import { AppCard } from './components/AppCard';
import { AddAppModal } from './components/AddAppModal';
import { AppDetailsModal } from './components/AppDetailsModal';

export default function App() {
  const [customApps, setCustomApps] = useState<AppItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' } | null>(null);

  // Load custom apps from browser localStorage on initial mount
  useEffect(() => {
    const saved = getStoredCustomApps();
    setCustomApps(saved);
  }, []);

  // Combine initial built-in apps with user-added custom apps from localStorage
  const allApps = useMemo(() => {
    // Custom apps appear at the beginning of the catalog
    return [...customApps, ...INITIAL_APPS];
  }, [customApps]);

  // Derive dynamic list of categories including any custom categories
  const categories = useMemo(() => {
    const cats = new Set(DEFAULT_CATEGORIES);
    allApps.forEach(app => {
      if (app.category) cats.add(app.category);
    });
    return Array.from(cats);
  }, [allApps]);

  // Filter apps by category and search query
  const filteredApps = useMemo(() => {
    return allApps.filter(app => {
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term || 
        app.name.toLowerCase().includes(term) ||
        app.developer.toLowerCase().includes(term) ||
        app.category.toLowerCase().includes(term) ||
        app.shortDescription.toLowerCase().includes(term) ||
        (app.fullDescription && app.fullDescription.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [allApps, selectedCategory, searchTerm]);

  // Handle saving newly added app
  const handleSaveApp = (newApp: AppItem) => {
    const updatedCustomApps = saveCustomApp(newApp);
    setCustomApps(updatedCustomApps);
    
    // Select 'All' or the app's category so user sees it right away
    setSelectedCategory('All');
    setSearchTerm('');

    showToast(
      'App Published to Catalog!',
      `"${newApp.name}" is now live in your Mabs Store and saved to localStorage.`,
      'success'
    );
  };

  // Handle deleting a custom app
  const handleDeleteCustomApp = (id: string) => {
    const appToDelete = customApps.find(a => a.id === id);
    if (!appToDelete) return;

    if (window.confirm(`Are you sure you want to delete "${appToDelete.name}" from your local store?`)) {
      const updated = deleteStoredApp(id);
      setCustomApps(updated);
      showToast('App Removed', `"${appToDelete.name}" was removed from your catalog.`, 'info');
    }
  };

  // Handle updating an APK URL
  const handleUpdateApkUrl = (appId: string, newUrl: string) => {
    // Check if it's in custom apps or initial apps
    const isCustom = customApps.some(a => a.id === appId);
    if (isCustom) {
      const target = customApps.find(a => a.id === appId);
      if (target) {
        const updated = { ...target, apkDownloadUrl: newUrl };
        const newCustomList = updateStoredApp(updated);
        setCustomApps(newCustomList);
        if (selectedApp?.id === appId) {
          setSelectedApp(updated);
        }
      }
    } else {
      // It's in INITIAL_APPS, save an override in custom storage
      const initialTarget = INITIAL_APPS.find(a => a.id === appId);
      if (initialTarget) {
        const customOverride: AppItem = {
          ...initialTarget,
          apkDownloadUrl: newUrl,
          isCustom: true,
        };
        const newCustomList = saveCustomApp(customOverride);
        setCustomApps(newCustomList);
        if (selectedApp?.id === appId) {
          setSelectedApp(customOverride);
        }
      }
    }

    showToast('APK URL Updated', 'The download link was updated successfully.', 'success');
  };

  // Handle Download trigger
  const handleDownloadApk = (app: AppItem) => {
    if (!app.apkDownloadUrl || app.apkDownloadUrl.trim().length === 0) {
      setSelectedApp(app);
      setIsDetailsModalOpen(true);
      showToast('APK URL Pending', 'Please provide or edit the APK download link for this app.', 'info');
      return;
    }

    showToast(
      'Starting APK Download',
      `Downloading ${app.name} (${app.appSize || 'APK Package'})...`,
      'success'
    );

    // Open the download URL
    window.open(app.apkDownloadUrl, '_blank', 'noopener,noreferrer');
  };

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background illumination */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar with brand & "＋ Add App" CTA */}
      <Navbar
        onOpenAddApp={() => setIsAddModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalAppsCount={allApps.length}
        customAppsCount={customApps.length}
      />

      {/* Success / Feedback Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full bg-zinc-900 border border-zinc-700/80 rounded-2xl p-4 shadow-2xl shadow-black/80 flex items-start gap-3"
          >
            <div className={`p-2 rounded-xl shrink-0 ${
              toastMessage.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
            }`}>
              {toastMessage.type === 'success' ? <Check className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-zinc-100">{toastMessage.title}</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{toastMessage.desc}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-zinc-500 hover:text-zinc-300 text-xs p-1"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        
        {/* Featured Store Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mabs Tech &bull; Android APK Hub</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Curated Android Apps & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Digital Archives</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed max-w-xl">
              Download high-performance APKs, explore multimedia historical archives, or publish your own custom apps directly to your local store catalog.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                id="hero-add-app-btn"
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>＋ Add App to Store</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const imranApp = allApps.find(a => a.id.includes('imran-khan'));
                  if (imranApp) {
                    setSelectedApp(imranApp);
                    setIsDetailsModalOpen(true);
                  }
                }}
                className="px-4 py-2.5 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors border border-zinc-700/60"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Featured: Imran Khan Archive</span>
              </button>
            </div>
          </div>
        </section>

        {/* Category Filter Pills Bar + Controls */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/80">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? allApps.length 
                : allApps.filter(a => a.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-emerald-700 text-emerald-100' : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick stats / Add App Secondary Trigger */}
          <div className="flex items-center gap-3 shrink-0 text-xs text-zinc-400">
            <span className="hidden md:inline">
              Showing <strong className="text-zinc-200">{filteredApps.length}</strong> of <strong className="text-zinc-200">{allApps.length}</strong> apps
            </span>
            {customApps.length > 0 && (
              <span className="text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                {customApps.length} local custom {customApps.length === 1 ? 'app' : 'apps'}
              </span>
            )}
          </div>
        </section>

        {/* Apps Catalog Grid */}
        <section id="apps-grid-section">
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  onOpenDetails={(selected) => {
                    setSelectedApp(selected);
                    setIsDetailsModalOpen(true);
                  }}
                  onDeleteCustomApp={handleDeleteCustomApp}
                  onDownloadApk={handleDownloadApk}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 text-center bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-800 p-8">
              <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                <FolderPlus className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-zinc-200 mb-1">No apps found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5">
                {searchTerm 
                  ? `No applications matched "${searchTerm}". Try a different search term or category.` 
                  : `No apps in category "${selectedCategory}". Click below to add a new app.`}
              </p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>＋ Add an App Now</span>
              </button>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
        <div className="flex items-center gap-2">
          <span>🚀 Mabs Store &bull; mabs777/mabs-store</span>
          <span>&bull;</span>
          <span className="text-zinc-400">LocalStorage Persistence Enabled</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <span>＋ Add New App</span>
          </button>
          <span>&bull;</span>
          <span>Version 1.0.0</span>
        </div>
      </footer>

      {/* "＋ Add App" Modal */}
      <AddAppModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveApp}
      />

      {/* App Details & APK inspector Modal */}
      <AppDetailsModal
        app={selectedApp}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedApp(null);
        }}
        onUpdateApkUrl={handleUpdateApkUrl}
        onDownloadApk={handleDownloadApk}
      />
    </div>
  );
}
