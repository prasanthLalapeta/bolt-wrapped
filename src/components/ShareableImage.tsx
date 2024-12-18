import React from 'react';
import { format } from 'date-fns';
import { Code2, GitCommit, Rocket } from 'lucide-react';

interface ShareableImageProps {
  userData: {
    login: string;
    name: string;
    avatar_url: string;
  };
  stats: {
    journey: {
      firstProject: {
        date: string;
        name: string;
      };
      latestProject: {
        date: string;
        name: string;
      };
      totalProjects: number;
      totalCommits: number;
    };
    languages: { name: string; value: number }[];
  };
}

export function ShareableImage({ userData, stats }: ShareableImageProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <img
          src={userData.avatar_url}
          alt={userData.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{userData.name}'s Bolt Journey</h2>
          <p className="text-gray-600">@{userData.login}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Journey Timeline */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold">Journey Timeline</h3>
          </div>
          <div className="space-y-2">
            <p>
              Started: {formatDate(stats.journey.firstProject.date)}
              <br />
              <span className="text-sm text-gray-500">
                First project: {stats.journey.firstProject.name}
              </span>
            </p>
            <p>
              Latest: {formatDate(stats.journey.latestProject.date)}
              <br />
              <span className="text-sm text-gray-500">
                Latest project: {stats.journey.latestProject.name}
              </span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div>
              <Code2 className="w-5 h-5 text-blue-500" />
              <p className="font-semibold">Projects</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.journey.totalProjects}
              </p>
            </div>
            <div>
              <GitCommit className="w-5 h-5 text-green-500" />
              <p className="font-semibold">Commits</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.journey.totalCommits}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Top Languages</h3>
        <div className="flex gap-2">
          {stats.languages.slice(0, 3).map((lang) => (
            <span
              key={lang.name}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}