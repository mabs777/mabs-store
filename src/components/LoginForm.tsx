import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Sparkles,
  Check,
  KeyRound
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginFormData, FormErrors, UserSession } from '../types';

interface LoginFormProps {
  onLoginSuccess: (session: UserSession) => void;
  onOpenForgotPassword: (email: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onOpenForgotPassword,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check for saved remember me in localStorage
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('login_remember_identifier');
      if (savedEmail) {
        setFormData((prev) => ({
          ...prev,
          identifier: savedEmail,
          rememberMe: true,
        }));
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  // Monitor Caps Lock on password field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        general: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Username or email is required';
    } else if (
      formData.identifier.includes('@') && 
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier)
    ) {
      newErrors.identifier = 'Please enter a valid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);

      if (formData.rememberMe) {
        try {
          localStorage.setItem('login_remember_identifier', formData.identifier);
        } catch {
          // ignore
        }
      } else {
        try {
          localStorage.removeItem('login_remember_identifier');
        } catch {
          // ignore
        }
      }

      onLoginSuccess({
        email: formData.identifier,
        name: formData.identifier.split('@')[0],
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        rememberMe: formData.rememberMe,
      });
    }, 900);
  };

  const handleFillDemoCredentials = () => {
    setFormData({
      identifier: 'alex.morgan@example.com',
      password: 'SecurePassword2026!',
      rememberMe: true,
    });
    setErrors({});
    showToast('Demo credentials populated!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSocialClick = (provider: string) => {
    showToast(`Redirecting to ${provider} authentication...`);
  };

  return (
    <motion.div
      id="login-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60 text-zinc-100"
    >
      {/* Toast alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 left-0 right-0 mx-auto w-max max-w-[90%] px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-full shadow-lg flex items-center gap-2 z-30"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="text-center mb-7">
        <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 mb-1.5">
          Welcome Back
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Login Form */}
      <form id="login-form-element" onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Username / Email Field */}
        <div>
          <label 
            htmlFor="identifier-input" 
            className="block text-xs font-semibold text-zinc-300 mb-1.5"
          >
            Email or Username
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-zinc-500 pointer-events-none">
              <User className="w-4 h-4" />
            </div>
            <input
              id="identifier-input"
              name="identifier"
              type="text"
              value={formData.identifier}
              onChange={handleInputChange}
              placeholder="alex@example.com or username"
              autoComplete="username"
              className={`w-full h-11 pl-10 pr-4 bg-zinc-950/80 border rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all ${
                errors.identifier 
                  ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-zinc-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
          </div>
          {errors.identifier && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.identifier}</span>
            </motion.p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label 
              htmlFor="password-input" 
              className="block text-xs font-semibold text-zinc-300"
            >
              Password
            </label>
            {capsLockActive && (
              <span className="text-[11px] font-medium text-amber-400 flex items-center gap-1">
                Caps Lock is ON
              </span>
            )}
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-zinc-500 pointer-events-none">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password-input"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyDown}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`w-full h-11 pl-10 pr-11 bg-zinc-950/80 border rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all ${
                errors.password 
                  ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-zinc-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
            <button
              id="toggle-password-visibility"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.password}</span>
            </motion.p>
          )}
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-1 pb-1">
          <label className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer select-none">
            <input
              id="remember-me-checkbox"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-indigo-600 focus:ring-indigo-500/30 focus:ring-offset-0 focus:ring-1 cursor-pointer accent-indigo-600"
            />
            <span>Remember me</span>
          </label>

          <button
            id="forgot-password-link"
            type="button"
            onClick={() => onOpenForgotPassword(formData.identifier)}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          id="login-submit-button"
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-60 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800"></div>
        </div>
        <span className="relative px-3 bg-zinc-900 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          Or continue with
        </span>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          id="social-google-btn"
          type="button"
          onClick={() => handleSocialClick('Google')}
          className="h-10 bg-zinc-950/70 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
          </svg>
          <span>Google</span>
        </button>

        <button
          id="social-github-btn"
          type="button"
          onClick={() => handleSocialClick('GitHub')}
          className="h-10 bg-zinc-950/70 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4 fill-current text-zinc-200" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          <span>GitHub</span>
        </button>
      </div>

      {/* Auto-fill demo helper for instant testing */}
      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
        <button
          id="fill-demo-btn"
          type="button"
          onClick={handleFillDemoCredentials}
          className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-indigo-300 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Fill Demo Credentials</span>
        </button>
        <span className="text-xs text-zinc-500">
          No account? <a href="#signup" onClick={(e) => { e.preventDefault(); showToast('Sign-up flow initialized'); }} className="text-indigo-400 hover:text-indigo-300 font-semibold">Sign up</a>
        </span>
      </div>
    </motion.div>
  );
};
