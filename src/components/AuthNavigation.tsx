import { useState, useEffect } from 'react';
import { checkAuthenticationStatus, type AuthStatus } from '../utils/vanillaApi';

interface AuthNavigationProps {
  className?: string;
}

export default function AuthNavigation({ className = '' }: AuthNavigationProps) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({ isAuthenticated: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const status = await checkAuthenticationStatus();
        setAuthStatus(status);
      } catch (error) {
        console.error('Failed to check auth status:', error);
        setAuthStatus({ isAuthenticated: false });
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className={className || "flex items-center space-x-2"}>
        <div className="w-20 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-sm animate-pulse"></div>
      </div>
    );
  }

  // User is authenticated - show single "My Account" button
  if (authStatus.isAuthenticated && authStatus.user) {
    return (
      <div className={className || "flex items-center"}>
        <span className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg bg-pink-400 text-white border border-transparent">
          My Account
        </span>
      </div>
    );
  }

  // User is not authenticated - show sign up/login
  return (
    <div className={className || "flex items-center space-x-2"}>
      <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 whitespace-nowrap">
        Log In
      </span>
      <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-pink-400 text-white border border-transparent whitespace-nowrap">
        Sign Up
      </span>
    </div>
  );
}