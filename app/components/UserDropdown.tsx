"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, LogIn } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface UserDropdownProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export const UserDropdown = ({
  isLoggedIn,
  onLoginClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: UserDropdownProps) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
      >
        <User className="w-3.5 h-3.5 text-white" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 ${
            isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'
          } border rounded-lg shadow-xl overflow-hidden animate-scaleIn`}
          style={{ transformOrigin: 'top right' }}
        >
          {isLoggedIn ? (
            // Logged In Menu
            <>
              <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Guest User
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  guest@example.com
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    onProfileClick?.();
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors ${
                    isDark
                      ? 'text-gray-300 hover:bg-[#1a1a1a] hover:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                <button
                  onClick={() => {
                    onSettingsClick?.();
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors ${
                    isDark
                      ? 'text-gray-300 hover:bg-[#1a1a1a] hover:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>

              <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <button
                  onClick={() => {
                    onLogoutClick?.();
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors ${
                    isDark
                      ? 'text-red-400 hover:bg-red-500/10'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            // Not Logged In Menu
            <div className="py-1">
              <button
                onClick={() => {
                  onLoginClick();
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors ${
                  isDark
                    ? 'text-gray-300 hover:bg-[#1a1a1a] hover:text-white'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.15s ease-out;
        }
      `}</style>
    </div>
  );
};