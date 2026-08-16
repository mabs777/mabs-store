import React from 'react';
import { 
  Download, 
  ExternalLink, 
  Layers, 
  HardDrive, 
  Calendar, 
  Sparkles, 
  Trash2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
  onOpenDetails: (app: AppItem) => void;
  onDeleteCustomApp?: (id: string) => void;
  onDownloadApk: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onOpenDetails,
  onDeleteCustomApp,
  onDownloadApk,
}) => {
  const hasDownloadUrl = Boolean(app.apkDownloadUrl && app.apkDownloadUrl.trim().length > 0);

  return (
    <motion.div
      id={`app-card-${app.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700/90 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-black/50"
    >
      <div>
        {/* Top bar: Category + Version + Custom Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
            <Layers className="w-3 h-3 text-indigo-400" />
            {app.category}
          </span>

          <div className="flex items-center gap-1.5">
            {app.isCustom && (
              <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Added App
              </span>
            )}
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-800">
              v{app.version}
            </span>
          </div>
        </div>

        {/* Header: Icon + Name + Developer */}
        <div className="flex items-start gap-3.5 mb-3">
          {/* App Icon */}
          <div className="relative w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0 overflow-hidden shadow-md flex items-center justify-center">
            {app.iconUrl ? (
              <img
                src={app.iconUrl}
                alt={`${app.name} icon`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : null}
            {/* Fallback Icon Graphic */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-br from-indigo-900/60 to-purple-900/60 text-lg font-bold text-indigo-200">
              {app.name.charAt(0)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
              {app.name}
            </h3>
            <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5 truncate">
              <span>{app.developer}</span>
              {app.developer.includes('Mabs') && (
                <span title="Verified Mabs Developer">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                </span>
              )}
            </p>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-zinc-500">
              {app.appSize && (
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-zinc-500" />
                  {app.appSize}
                </span>
              )}
              {app.releaseDate && (
                <span className="flex items-center gap-1">
                  &bull;
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  {app.releaseDate}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
          {app.shortDescription}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-3.5 border-t border-zinc-800/80 flex items-center gap-2">
        {/* Details button */}
        <button
          id={`view-details-btn-${app.id}`}
          type="button"
          onClick={() => onOpenDetails(app)}
          className="flex-1 h-9 bg-zinc-800 hover:bg-zinc-700/90 text-zinc-300 hover:text-white text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-zinc-700/50"
        >
          <span>Details</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </button>

        {/* Download APK Button */}
        {hasDownloadUrl ? (
          <button
            id={`download-apk-btn-${app.id}`}
            type="button"
            onClick={() => onDownloadApk(app)}
            className="flex-1 h-9 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </button>
        ) : (
          <button
            id={`pending-apk-btn-${app.id}`}
            type="button"
            onClick={() => onOpenDetails(app)}
            className="flex-1 h-9 bg-zinc-800/60 text-zinc-400 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 border border-dashed border-zinc-700 hover:text-zinc-300 transition-colors"
            title="APK URL not provided yet. Click to view or edit details."
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400/80" />
            <span>APK Pending</span>
          </button>
        )}

        {/* Custom App Delete Button */}
        {app.isCustom && onDeleteCustomApp && (
          <button
            id={`delete-custom-app-${app.id}`}
            type="button"
            onClick={() => onDeleteCustomApp(app.id)}
            className="w-9 h-9 bg-zinc-800/40 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 rounded-xl flex items-center justify-center transition-colors border border-zinc-800"
            title="Delete this custom added app"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
