import React from 'react';
import { GithubIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function LoginButton() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <button
      onClick={isAuthenticated ? logout : login}
      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
    >
      <GithubIcon className="w-5 h-5" />
      {isAuthenticated ? 'Sign Out' : 'Sign in with GitHub'}
    </button>
  );
}