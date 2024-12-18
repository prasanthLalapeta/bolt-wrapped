import React, { useState } from 'react';
import { setGitHubToken } from '../services/github';
import { KeyRound } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [token, setToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      await setGitHubToken(token.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <KeyRound className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold">GitHub Authentication</h2>
        </div>
        
        <p className="text-gray-600 mb-4">
          To avoid rate limiting, please provide a GitHub personal access token.
          You can create one at{' '}
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub Settings
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your GitHub token"
            className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
          />
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}