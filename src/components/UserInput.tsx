import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BorderBeam } from "@/components/magicui/border-beam";

interface UserInputProps {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export function UserInput({ onSubmit, isLoading }: UserInputProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative h-12 rounded-lg overflow-hidden">
        <BorderBeam
          className="opacity-30"
          colorFrom="rgb(147, 51, 234)"
          colorTo="rgb(79, 70, 229)"
          duration={3}
        />
        <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="h-full w-full pl-10 pr-24
                     bg-transparent
                     text-gray-900 dark:text-gray-100 
                     placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none
                     transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="absolute inset-y-1 right-1
                     px-4
                     bg-purple-600 dark:bg-purple-500 
                     text-white font-medium rounded-md
                     hover:bg-purple-700 dark:hover:bg-purple-600
                     focus:outline-none 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
    </form>
  );
}