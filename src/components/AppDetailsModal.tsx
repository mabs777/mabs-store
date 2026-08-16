import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Layers, 
  HardDrive, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Edit3, 
  Save, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppItem } from '../types';

interface AppDetailsModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateApkUrl?: (appId: string, newUrl: string) => void;
  onDownloadApk: (app: AppItem) => void;
}

export const AppDetailsModal: React.FC<AppDetailsModalProps> = ({
  app,
  isOpen,
  onClose,
  onUpdateApkUrl,
  onDownloadApk,
}) => {
  const [isEditingApk, setIsEditingApk] = useState(false);
  const [apkInput, setApkInput] = useState('');
  const [activeScreenshot, setActiveScreenshot] = useState<number>(0);

  if (!app) return null;

  const handleStartEditApk = () => {
    setApkInput(app.apkDownloadUrl || '');
    setIsEditingApk(true);
  };

  const handleSaveApk = () => {
    if (onUpdateApkUrl) {
      onUpdateApkUrl(app.id, apkInput.trim());
    }
    setIsEditingApk(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="app-details-modal-backdrop" 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            id="app-details-modal-container"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl text-zinc-100 flex flex-col max-h-[92vh] overflow-hidden my-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {app.category}
                </span>
                <span className="text-xs text-zinc-500 font-mono">v{app.version}</span>
              </div>

              <button
                id="close-details-modal-btn"
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* App Identity Banner */}
              <div className="flex items-start gap-4 pb-6 border-b border-zinc-800">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
                  {app.iconUrl ? (
                    <img
                      src={app.iconUrl}
                      alt={app.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 text-2xl font-bold text-white">
                      {app.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 leading-tight">
                    {app.name}
                  </h2>
                  <p className="text-sm text-zinc-400 flex items-center gap-1.5 mt-1 font-medium">
                    <span>{app.developer}</span>
                    {app.developer.includes('Mabs') && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                    )}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                      <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{app.appSize || '15 MB'}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{app.releaseDate || '2026-08-15'}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Clean APK Verified</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* APK Download & Configuration Section */}
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/90 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Android APK Package</span>
                  </span>

                  {!isEditingApk && (
                    <button
                      onClick={handleStartEditApk}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{app.apkDownloadUrl ? 'Edit URL' : 'Set APK URL'}</span>
                    </button>
                  )}
                </div>

                {isEditingApk ? (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={apkInput}
                      onChange={(e) => setApkInput(e.target.value)}
                      placeholder="https://example.com/download/app.apk"
                      className="w-full h-10 px-3 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveApk}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save URL</span>
                      </button>
                      <button
                        onClick={() => setIsEditingApk(false)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="text-xs text-zinc-400 overflow-hidden">
                      {app.apkDownloadUrl ? (
                        <span className="font-mono text-[11px] text-zinc-300 break-all">
                          {app.apkDownloadUrl}
                        </span>
                      ) : (
                        <span className="text-amber-400/90 flex items-center gap-1.5 text-xs">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>No APK download URL provided yet. You can edit and supply one anytime.</span>
                        </span>
                      )}
                    </div>

                    {app.apkDownloadUrl ? (
                      <button
                        id="details-download-apk-btn"
                        onClick={() => onDownloadApk(app)}
                        className="h-10 px-5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-emerald-600/25 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download APK</span>
                      </button>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Screenshots Gallery */}
              {app.screenshotUrls && app.screenshotUrls.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Screenshots & Media
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {app.screenshotUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="aspect-video bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-600 transition-colors"
                        onClick={() => setActiveScreenshot(idx)}
                      >
                        <img
                          src={url}
                          alt={`${app.name} preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description & Overview */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  About This App
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                  {app.fullDescription || app.shortDescription}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 text-xs text-zinc-400">
              <span>Mabs Store &bull; Fast, verified APK downloads</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
