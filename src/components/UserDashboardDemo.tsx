import React from 'react';
import { UserCheck, ShieldCheck, Clock, KeyRound, LogOut, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { UserSession } from '../types';

interface UserDashboardDemoProps {
  session: UserSession;
  onSignOut: () => void;
}

export const UserDashboardDemo: React.FC<UserDashboardDemoProps> = ({
  session,
  onSignOut,
}) => {
  return (
    <motion.div
      id="dashboard-session-card"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl text-zinc-100 text-left"
    >
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-zinc-800">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">Authenticated</h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Active
            </span>
          </div>
          <p className="text-xs text-zinc-400">Welcome back to your workspace</p>
        </div>
      </div>

      <div className="space-y-3.5 mb-6">
        <div className="p-3.5 bg-zinc-950/70 rounded-xl border border-zinc-800/80">
          <span className="text-xs text-zinc-500 block mb-1">User Identity</span>
          <div className="text-sm font-semibold text-zinc-200 break-all">{session.email}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Remember Me</span>
            </div>
            <span className={`text-xs font-semibold ${session.rememberMe ? 'text-emerald-400' : 'text-zinc-400'}`}>
              {session.rememberMe ? 'Enabled (Persistent)' : 'Disabled (Session)'}
            </span>
          </div>

          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Login Timestamp</span>
            </div>
            <span className="text-xs font-semibold text-zinc-300">
              {session.loginTime}
            </span>
          </div>
        </div>

        <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-zinc-400">Security Token:</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">jwt_98x...f3a</span>
        </div>
      </div>

      <button
        id="sign-out-btn"
        onClick={onSignOut}
        className="w-full h-11 bg-zinc-800 hover:bg-zinc-700 active:scale-[0.99] text-zinc-200 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-all border border-zinc-700"
      >
        <LogOut className="w-4 h-4 text-zinc-400" />
        <span>Sign Out / Test Again</span>
      </button>
    </motion.div>
  );
};
