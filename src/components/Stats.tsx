import React, { useRef } from 'react';
import { format } from 'date-fns';
import { Trophy, Code2, GitCommit, Rocket } from 'lucide-react';
import { BorderBeam } from "@/components/magicui/border-beam";
import { toPng } from 'html-to-image';

interface StatsProps {
  data: {
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
    achievements: {
      type: string;
      title: string;
      description: string;
      icon: string;
    }[];
  };
  userData: {
    avatar_url: string;
    name: string;
    login: string;
  };
}

export function Stats({ data, userData }: StatsProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (!contentRef.current) return;

    try {
      const button = document.querySelector('#download-button');
      if (button) {
        button.textContent = 'Generating image...';
        button.setAttribute('disabled', 'true');
      }

      const node = contentRef.current;
      const dataUrl = await toPng(node); // Generate the image

      // Create a Blob for mobile compatibility
      const blob = await fetch(dataUrl).then(res => res.blob());
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${userData.login}-bolt-wrapped.png`;

      // Create a canvas to add the watermark
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image
          ctx.drawImage(img, 0, 0);

          // Add watermark
          const watermarkText = import.meta.env.VITE_DEPLOYED_URL.replace('https://', '');
          ctx.font = '20px Arial';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // White with transparency
          ctx.textAlign = 'center'; // Center the text
          const padding = 30; // Space below the watermark
          ctx.fillText(watermarkText, canvas.width / 2, canvas.height - padding); // Position the watermark

          // Convert canvas to Blob and trigger download
          canvas.toBlob((blob) => {
            if (blob) {
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `${userData.login}-bolt-wrapped.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }, 'image/png');
        }
      };

    } catch (error) {
      console.error('Error generating image:', error);
      alert('Could not generate image. Please try again.');
    } finally {
      const button = document.querySelector('#download-button');
      if (button) {
        button.textContent = 'Download Journey Image';
        button.removeAttribute('disabled');
      }
    }
  };

  if (!userData) {
    return null; // or a loading state
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div
        ref={contentRef}
        data-content
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 md:p-10 flex flex-col gap-16"
      >
        {/* Profile Header */}
        <div data-header className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-24 sm:w-28 h-24 sm:h-28 shrink-0">
            <BorderBeam
              className="opacity-50 rounded-full"
              colorFrom="rgb(147, 51, 234)"
              colorTo="rgb(79, 70, 229)"
              duration={4}
            />
            <img
              src={userData.avatar_url}
              alt={userData.name || userData.login}
              className="absolute inset-[1px] w-[calc(100%-2px)] h-[calc(100%-2px)] rounded-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {userData.name || userData.login} @{userData.login}
            </h1>
            <p className="text-xl text-purple-600 dark:text-purple-400 font-medium">
              Bolt Journey
            </p>
          </div>
        </div>

        {/* Journey Timeline */}
        <div data-timeline className="flex flex-col gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Rocket className="w-7 h-7 text-purple-500 flex-shrink-0 translate-y-[1px]" />
              <span className="dark:text-white">Your Bolt Journey</span>
            </h2>
            <div className="relative">
              <div className="absolute left-[6px] w-0.5 bg-purple-200 dark:bg-purple-800 h-full" />

              {/* First Project */}
              <div data-timeline-item className="relative pl-10 mb-12">
                <div className="absolute left-0 top-3 w-3 h-3 bg-purple-500 rounded-full" />
                <div data-timeline-content className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300 text-lg mb-1">First Bolt Project</h3>
                  <p className="text-base text-gray-600 dark:text-gray-300">{formatDate(data.journey.firstProject.date)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{data.journey.firstProject.name}</p>
                </div>
              </div>

              {/* Stats in between */}
              <div data-timeline-item className="relative pl-10 mb-12">
                <div data-stats-grid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div data-stat-card className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Code2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
                        <span className="font-semibold text-blue-700 dark:text-blue-300">
                          Total Projects
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {data.journey.totalProjects}
                      </p>
                    </div>
                  </div>
                  <div data-stat-card className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GitCommit className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="font-semibold text-green-700 dark:text-green-300">
                          Total Commits
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {data.journey.totalCommits}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Project */}
              <div data-timeline-item className="relative pl-10">
                <div className="absolute left-0 top-3 w-3 h-3 bg-purple-500 rounded-full" />
                <div data-timeline-content className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300 text-lg mb-1">Latest Bolt Project</h3>
                  <p className="text-base text-gray-600 dark:text-gray-300">{formatDate(data.journey.latestProject.date)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{data.journey.latestProject.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div data-achievements>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Trophy className="w-7 h-7 text-yellow-500 flex-shrink-0 translate-y-[1px]" />
              <span className="dark:text-white">Achievements Unlocked</span>
            </h2>
            <div data-achievements-grid className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {data.achievements.map((achievement) => (
                <div
                  key={achievement.type}
                  data-achievement-card
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/50 dark:to-orange-950/50 
                           p-6 rounded-lg border border-yellow-100/50 dark:border-yellow-500/20
                           backdrop-blur-sm flex items-center min-h-[80px]"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center
                                  bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-500/40 dark:to-orange-500/40
                                  rounded-lg border border-yellow-200/50 dark:border-yellow-500/30
                                  shadow-inner"
                    >
                      <span className={`text-2xl ${achievement.icon === '👶' ? 'text-yellow-900 dark:text-white' : 'text-yellow-700 dark:text-yellow-300'}`}>
                        {achievement.icon}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 text-base leading-tight">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-yellow-700/90 dark:text-yellow-400/90 leading-tight mt-1">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons for Download */}
      <div className="mt-8 text-center">
        <button
          id="download-button"
          onClick={downloadAsImage}
          className="w-full sm:w-auto bg-purple-600 dark:bg-purple-500 
                   text-white px-6 py-3 rounded-lg 
                   font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 
                   transition-colors text-base
                   focus:outline-none focus:ring-2 focus:ring-purple-500 
                   focus:ring-offset-2 dark:focus:ring-offset-gray-800
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download My Bolt Journey ⚡
        </button>
      </div>
    </div>
  );
}