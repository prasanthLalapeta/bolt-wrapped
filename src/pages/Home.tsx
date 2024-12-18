import React from 'react';
import { GithubIcon, UserX } from 'lucide-react';
import { UserInput } from '../components/UserInput';
import { Stats } from '../components/Stats';
import { useGitHubData } from '../hooks/useGitHubData';
import { useAuth } from '../hooks/useAuth';
import { BorderBeam } from "@/components/magicui/border-beam";
import { ThemeToggle } from '../components/ThemeToggle';
import { GetStarted } from '../components/GetStarted';

export function Home() {
  const { isAuthenticated, loading } = useAuth();
  const { isLoading, error, userData, stats, noBoltProjects, fetchData } = useGitHubData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please provide a valid GitHub token</div>;
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <BorderBeam
              className="opacity-50 rounded-full"
              colorFrom="rgb(147, 51, 234)"
              colorTo="rgb(79, 70, 229)"
              duration={2}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Fetching your Bolt journey...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
                <UserX className="w-10 h-10 text-red-500 animate-bounce" />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            User Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            We couldn't find this GitHub user. Please check the username and try again.
          </p>
        </div>
      );
    }

    if (noBoltProjects && userData) {
      return <GetStarted username={userData.login} />;
    }

    if (userData && stats) {
      return (
        <div className="w-full">
          <Stats data={stats} userData={userData} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <BorderBeam
                  className="opacity-50 rounded-lg"
                  colorFrom="rgb(147, 51, 234)"
                  colorTo="rgb(79, 70, 229)"
                  duration={3}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <GithubIcon className="w-8 h-8 text-gray-900 dark:text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">BoltWrapped ⚡</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Year in Bolt.new ⚡
            </h2>
          </div>

          <UserInput onSubmit={fetchData} isLoading={isLoading} />

          {renderContent()}
        </div>
      </main>

      <footer className="py-6 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          Built with ❤️ by{' '}
          <a
            href="https://x.com/heylalapeta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            @heylalapeta
          </a>
        </p>
      </footer>
    </div>
  );
}