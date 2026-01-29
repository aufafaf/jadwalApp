"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Calendar } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const { isDark } = useTheme();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (mode === 'login') {
      alert('Login successful! (Demo)');
    } else {
      alert('Registration successful! (Demo)');
    }
    
    setLoading(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal Card - Extra Small */}
      <div
        className={`relative w-full max-w-[360px] transform transition-all duration-300 animate-scaleIn ${
          isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'
        } border rounded-lg shadow-2xl overflow-hidden`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10' 
            : 'bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5'
        }`} />

        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-1.5 rounded-lg transition-all ${
            isDark 
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative p-5">
          {/* Logo & Title */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg mb-2">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className={`text-lg font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {mode === 'login' ? 'Sign in to continue' : 'Sign up to get started'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {mode === 'register' && (
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required={mode === 'register'}
                    className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs transition-all ${
                      isDark
                        ? 'bg-[#1a1a1a] border-gray-800 text-white placeholder-gray-500 focus:border-cyan-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                    } focus:outline-none focus:ring-1 focus:ring-cyan-500/20`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs transition-all ${
                    isDark
                      ? 'bg-[#1a1a1a] border-gray-800 text-white placeholder-gray-500 focus:border-cyan-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                  } focus:outline-none focus:ring-1 focus:ring-cyan-500/20`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-9 pr-10 py-2 border rounded-md text-xs transition-all ${
                    isDark
                      ? 'bg-[#1a1a1a] border-gray-800 text-white placeholder-gray-500 focus:border-cyan-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                  } focus:outline-none focus:ring-1 focus:ring-cyan-500/20`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required={mode === 'register'}
                    className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs transition-all ${
                      isDark
                        ? 'bg-[#1a1a1a] border-gray-800 text-white placeholder-gray-500 focus:border-cyan-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                    } focus:outline-none focus:ring-1 focus:ring-cyan-500/20`}
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    className="w-3 h-3 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className={`font-medium ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}
                >
                  Forgot?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-900 border-t-transparent" />
                  {mode === 'login' ? 'Signing in...' : 'Creating...'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`} />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className={`px-2 ${isDark ? 'bg-[#0f0f0f] text-gray-500' : 'bg-white text-gray-500'}`}>
                OR
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-2">
            <button
              type="button"
              className={`w-full py-2.5 border rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                isDark
                  ? 'border-gray-800 hover:bg-[#1a1a1a] text-white'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Switch Mode */}
          <div className="mt-4 text-center text-xs">
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            </span>
            {' '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
              }}
              className={`font-semibold ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};