import React, { useState } from 'react';
import { 
  Code2, 
  Shield, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LoginForm } from './components/LoginForm';
import { UserDashboardDemo } from './components/UserDashboardDemo';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { CodeModal } from './components/CodeModal';
import { UserSession } from './types';

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const handleLoginSuccess = (userSession: UserSession) => {
    setSession(userSession);
  };

  const handleSignOut = () => {
    setSession(null);
  };

  const handleOpenForgotPassword = (email: string) => {
    setForgotEmail(email);
    setIsForgotModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Lock className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-zinc-200">
            AuthCore <span className="text-indigo-400 text-xs font-normal">UI</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="view-source-code-btn"
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg text-xs font-semibold text-zinc-200 hover:text-white transition-all shadow-sm"
          >
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">View Pure HTML & CSS</span>
            <span className="sm:hidden">Code</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full flex flex-col items-center justify-center">
          {session ? (
            <UserDashboardDemo session={session} onSignOut={handleSignOut} />
          ) : (
            <LoginForm 
              onLoginSuccess={handleLoginSuccess}
              onOpenForgotPassword={handleOpenForgotPassword}
            />
          )}
        </div>
      </main>

      {/* Footer info & security badge */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-2 z-10">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-bit TLS Encrypted &bull; End-to-End Secure</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
          <span>&bull;</span>
          <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
          <span>&bull;</span>
          <button 
            onClick={() => setIsCodeModalOpen(true)}
            className="hover:text-indigo-400 text-zinc-400 inline-flex items-center gap-1 transition-colors"
          >
            <span>HTML5/CSS3 Source</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </footer>

      {/* Modals */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        initialEmail={forgotEmail}
      />

      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
