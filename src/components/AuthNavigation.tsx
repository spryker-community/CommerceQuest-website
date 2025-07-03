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
        <a
          href="https://forum.commercequest.space/profile/account-privacy"
          className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition duration-300 bg-pink-400 hover:bg-pink-500 text-white border border-transparent"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Account
        </a>
      </div>
    );
  }

  // User is not authenticated - show sign up/login
  return (
    <div className={className || "flex items-center space-x-2"}>
      <a
        href="https://forum.commercequest.space/entry/signin"
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition duration-300 text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white border border-neutral-300 hover:border-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500 whitespace-nowrap"
        target="_blank"
        rel="noopener noreferrer"
      >
        Log In
      </a>
      <a
        href="https://forum.commercequest.space/entry/register"
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition duration-300 bg-pink-400 hover:bg-pink-500 text-white border border-transparent whitespace-nowrap"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sign Up
      </a>
    </div>
  );
}