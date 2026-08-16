import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  UploadCloud, 
  Sparkles, 
  Image as ImageIcon, 
  Download, 
  Layers, 
  User, 
  FileText, 
  Calendar, 
  HardDrive, 
  Tag, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppItem, NewAppFormData } from '../types';
import { DEFAULT_CATEGORIES } from '../data/defaultApps';

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (app: AppItem) => void;
}

export const AddAppModal: React.FC<AddAppModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const initialFormState: NewAppFormData = {
    name: '',
    developer: '🚀 Mabs Tech ⚡',
    shortDescription: '',
    fullDescription: '',
    version: '1.0.0',
    category: 'Biography & History',
    iconUrl: '',
    screenshotUrls: '',
    apkDownloadUrl: '',
    appSize: '18.4 MB',
    releaseDate: new Date().toISOString().split('T')[0],
  };

  const [formData, setFormData] = useState<NewAppFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof NewAppFormData, string>>>({});
  const [customCategory, setCustomCategory] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof NewAppFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof NewAppFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'App name is required';
    }
    if (!formData.developer.trim()) {
      newErrors.developer = 'Developer name is required';
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }
    if (!formData.version.trim()) {
      newErrors.version = 'Version is required (e.g. 1.0.0)';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse screenshots
    const screenshots = formData.screenshotUrls
      ? formData.screenshotUrls
          .split(/[\n,]+/)
          .map(s => s.trim())
          .filter(Boolean)
      : [];

    const newApp: AppItem = {
      id: `mabs-${Date.now()}-${formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: formData.name.trim(),
      developer: formData.developer.trim(),
      shortDescription: formData.shortDescription.trim(),
      fullDescription: formData.fullDescription.trim() || formData.shortDescription.trim(),
      version: formData.version.trim(),
      category: formData.category.trim(),
      iconUrl: formData.iconUrl.trim() || undefined,
      screenshotUrls: screenshots.length > 0 ? screenshots : undefined,
      apkDownloadUrl: formData.apkDownloadUrl.trim() || undefined,
      appSize: formData.appSize.trim() || '15 MB',
      releaseDate: formData.releaseDate || new Date().toISOString().split('T')[0],
      rating: 5.0,
      downloads: '1+',
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    onSave(newApp);
    setFormData(initialFormState);
    setErrors({});
    onClose();
  };

  // Test App Preloader for "Imran Khan — Life & Legacy"
  const handleLoadTestAppPreset = () => {
    setFormData({
      name: 'Imran Khan — Life & Legacy',
      developer: '🚀 Mabs Tech ⚡',
      shortDescription: 'An independent digital archive exploring the life, cricket career, philanthropy, political journey, achievements, timeline, photos, videos and quotes of Imran Khan.',
      fullDescription: 'Comprehensive multimedia digital archive dedicated to Imran Khan. Includes historic timeline of 1992 World Cup victory, SKMCH cancer hospital philanthropy, Namal University, political reform records, video archives, and inspirational quotes archive.',
      version: '1.0.0',
      category: 'Biography & History',
      iconUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      screenshotUrls: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
      apkDownloadUrl: '', // Left blank as requested until real APK is provided
      appSize: '18.4 MB',
      releaseDate: new Date().toISOString().split('T')[0],
    });
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="add-app-modal-backdrop" 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            id="add-app-modal-container"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800/90 rounded-2xl shadow-2xl text-zinc-100 flex flex-col max-h-[92vh] overflow-hidden my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-zinc-100 flex items-center gap-2">
                    <span>Add New App to Mabs Store</span>
                    <span className="text-[10px] uppercase font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Catalog Entry
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Publish your APK application to the store catalog (saved in your browser)
                  </p>
                </div>
              </div>

              <button
                id="close-add-app-modal-btn"
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preset Test App Banner */}
            <div className="px-6 py-2.5 bg-gradient-to-r from-indigo-950/60 to-emerald-950/40 border-b border-zinc-800/80 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">Need quick test data for <strong>Imran Khan — Life & Legacy</strong>?</span>
              </div>
              <button
                type="button"
                id="load-test-app-btn"
                onClick={handleLoadTestAppPreset}
                className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-md font-medium shrink-0 transition-colors"
              >
                Autofill Test App
              </button>
            </div>

            {/* Modal Body / Form */}
            <form id="add-app-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Row 1: App Name & Developer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="app-name-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    App Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-zinc-500 pointer-events-none">
                      <Layers className="w-4 h-4" />
                    </div>
                    <input
                      id="app-name-input"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Imran Khan — Life & Legacy"
                      className={`w-full h-10 pl-9 pr-3 bg-zinc-950 border rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-zinc-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="app-developer-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Developer <span className="text-red-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-zinc-500 pointer-events-none">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="app-developer-input"
                      name="developer"
                      type="text"
                      value={formData.developer}
                      onChange={handleChange}
                      placeholder="e.g. 🚀 Mabs Tech ⚡"
                      className={`w-full h-10 pl-9 pr-3 bg-zinc-950 border rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.developer ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-zinc-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                      }`}
                    />
                  </div>
                  {errors.developer && <p className="mt-1 text-[11px] text-red-400">{errors.developer}</p>}
                </div>
              </div>

              {/* Row 2: Category, Version, App Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="app-category-select" className="text-xs font-semibold text-zinc-300">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCustomCategory(!customCategory)}
                      className="text-[10px] text-emerald-400 hover:underline"
                    >
                      {customCategory ? 'Standard list' : 'Custom +'}
                    </button>
                  </div>
                  {customCategory ? (
                    <input
                      id="app-category-custom-input"
                      name="category"
                      type="text"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. History & Politics"
                      className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    />
                  ) : (
                    <div className="relative">
                      <select
                        id="app-category-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl text-xs text-zinc-100 focus:outline-none appearance-none cursor-pointer"
                      >
                        {DEFAULT_CATEGORIES.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat} className="bg-zinc-900 text-zinc-100">
                            {cat}
                          </option>
                        ))}
                      </select>
                      <Tag className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  )}
                  {errors.category && <p className="mt-1 text-[11px] text-red-400">{errors.category}</p>}
                </div>

                <div>
                  <label htmlFor="app-version-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Version <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="app-version-input"
                    name="version"
                    type="text"
                    value={formData.version}
                    onChange={handleChange}
                    placeholder="e.g. 1.0.0"
                    className={`w-full h-10 px-3 bg-zinc-950 border rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.version ? 'border-red-500' : 'border-zinc-800 focus:border-emerald-500'
                    }`}
                  />
                  {errors.version && <p className="mt-1 text-[11px] text-red-400">{errors.version}</p>}
                </div>

                <div>
                  <label htmlFor="app-size-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    App Size
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-zinc-500 pointer-events-none">
                      <HardDrive className="w-3.5 h-3.5" />
                    </div>
                    <input
                      id="app-size-input"
                      name="appSize"
                      type="text"
                      value={formData.appSize}
                      onChange={handleChange}
                      placeholder="e.g. 18.4 MB"
                      className="w-full h-10 pl-8 pr-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label htmlFor="app-short-desc-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Short Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="app-short-desc-input"
                  name="shortDescription"
                  rows={2}
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="A concise 1-2 sentence overview shown on the app card..."
                  className={`w-full p-3 bg-zinc-950 border rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all resize-none ${
                    errors.shortDescription ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-zinc-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
                {errors.shortDescription && <p className="mt-1 text-[11px] text-red-400">{errors.shortDescription}</p>}
              </div>

              {/* Full Description */}
              <div>
                <label htmlFor="app-full-desc-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Full Description & Features <span className="text-zinc-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="app-full-desc-input"
                  name="fullDescription"
                  rows={3}
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Detailed breakdown of app features, offline capabilities, changelog, etc..."
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Row 3: Icon URL & APK Download URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="app-icon-url-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    App Icon URL <span className="text-zinc-500 font-normal">(HTTPS Image URL)</span>
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <div className="absolute left-3 text-zinc-500 pointer-events-none top-3">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <input
                        id="app-icon-url-input"
                        name="iconUrl"
                        type="url"
                        value={formData.iconUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/icon.png"
                        className="w-full h-10 pl-9 pr-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                      />
                    </div>
                    {formData.iconUrl && (
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 flex items-center justify-center">
                        <img 
                          src={formData.iconUrl} 
                          alt="Icon Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="app-apk-url-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    APK Download URL <span className="text-zinc-500 font-normal">(Leave empty if not ready)</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-zinc-500 pointer-events-none">
                      <Download className="w-4 h-4" />
                    </div>
                    <input
                      id="app-apk-url-input"
                      name="apkDownloadUrl"
                      type="url"
                      value={formData.apkDownloadUrl}
                      onChange={handleChange}
                      placeholder="https://.../app-release.apk"
                      className="w-full h-10 pl-9 pr-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-zinc-500">
                    {formData.apkDownloadUrl ? '✓ Direct download link configured' : 'ℹ APK link can be edited or provided later.'}
                  </p>
                </div>
              </div>

              {/* Row 4: Screenshots & Release Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="app-screenshots-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Screenshot URLs <span className="text-zinc-500 font-normal">(One per line or comma-separated)</span>
                  </label>
                  <textarea
                    id="app-screenshots-input"
                    name="screenshotUrls"
                    rows={2}
                    value={formData.screenshotUrls}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="app-release-date-input" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Release Date
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-zinc-500 pointer-events-none">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      id="app-release-date-input"
                      name="releaseDate"
                      type="date"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      className="w-full h-10 pl-9 pr-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>
                  <div className="mt-3 p-2.5 bg-zinc-950/60 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Apps are saved to your browser <strong>localStorage</strong> immediately. Existing default apps remain intact.</span>
                  </div>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-950/80">
              <button
                id="cancel-add-app-btn"
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                id="submit-save-app-btn"
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                <Check className="w-4 h-4" />
                <span>Save App</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
              
