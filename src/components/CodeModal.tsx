import React, { useState } from 'react';
import { X, Copy, Check, Code, FileCode2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { standaloneHtmlCss } from '../data/vanillaCode';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'html' | 'css'>('single');
  const [copied, setCopied] = useState(false);

  // Extract separate parts if user wants pure HTML or pure CSS
  const getCleanCode = () => {
    if (activeTab === 'single') {
      return standaloneHtmlCss;
    }
    if (activeTab === 'html') {
      // Return HTML with external stylesheet link
      return standaloneHtmlCss
        .replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="style.css">');
    }
    if (activeTab === 'css') {
      const match = standaloneHtmlCss.match(/<style>([\s\S]*?)<\/style>/);
      return match ? match[1].trim() : '/* CSS not extracted */';
    }
    return standaloneHtmlCss;
  };

  const handleCopy = async () => {
    const code = getCleanCode();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="code-export-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            id="code-export-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col text-zinc-100 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-100">Clean HTML5 & CSS3 Source</h3>
                  <p className="text-xs text-zinc-400">Production-ready, responsive, zero-dependency dark theme code</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="copy-code-btn"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  id="close-code-modal"
                  onClick={onClose}
                  className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
                  aria-label="Close code preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subnav Format Switcher */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-zinc-950/30 border-b border-zinc-800/80 text-xs">
              <span className="text-zinc-400 font-medium mr-2">Export Format:</span>
              <button
                onClick={() => setActiveTab('single')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'single'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Single File (index.html)</span>
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'html'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Separate HTML</span>
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'css'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Separate CSS (styles.css)</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="flex-1 overflow-auto p-4 md:p-6 bg-zinc-950 font-mono text-xs text-zinc-300 leading-relaxed">
              <pre className="overflow-x-auto whitespace-pre">
                <code>{getCleanCode()}</code>
              </pre>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-400">
              <span>Includes HTML5 semantic markup, CSS3 custom variables, responsive media queries & SVG icons.</span>
              <button
                onClick={onClose}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
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
