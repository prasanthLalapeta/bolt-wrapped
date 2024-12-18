import { useState } from 'react';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
}

interface GitHubRepo {
  name: string;
  created_at: string;
  updated_at: string;
  description: string | null;
  topics: string[];
  language: string;
  stargazers_count: number;
}

interface StatsData {
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
  languages: { name: string; value: number }[];
}

interface Achievement {
  type: string;
  title: string;
  description: string;
  icon: string;
  condition: (data: {
    totalProjects: number;
    totalCommits: number;
    monthsSinceFirst: number;
    totalStars: number;
    languages: { name: string; value: number }[];
  }) => boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    type: 'pioneer',
    title: 'Bolt Pioneer',
    description: 'Started your Bolt.new journey',
    icon: '🚀',
    condition: () => true
  },
  {
    type: 'bolt_architect',
    title: 'Bolt Architect',
    description: 'Created 5 or more Bolt projects',
    icon: '🏗️',
    condition: ({ totalProjects }) => totalProjects >= 5
  },
  {
    type: 'bolt_master_builder',
    title: 'Master Builder',
    description: 'Created 10+ Bolt projects',
    icon: '👨‍💻',
    condition: ({ totalProjects }) => totalProjects >= 10
  },
  {
    type: 'first_steps',
    title: 'Bolt Baby',
    description: 'Made your first commit',
    icon: '👶',
    condition: ({ totalCommits }) => totalCommits >= 1
  },
  {
    type: 'code_enthusiast',
    title: 'Code Enthusiast',
    description: 'Made over 100 commits to Bolt projects',
    icon: '💻',
    condition: ({ totalCommits }) => totalCommits >= 100
  },
  {
    type: 'dedication',
    title: 'Dedicated Builder',
    description: 'Made over 500 commits to Bolt projects',
    icon: '🌟',
    condition: ({ totalCommits }) => totalCommits >= 500
  },
  {
    type: 'bolt_legend',
    title: 'Bolt Legend',
    description: 'Made over 1000 commits to Bolt projects',
    icon: '👑',
    condition: ({ totalCommits }) => totalCommits >= 1000
  },
  {
    type: 'consistent_builder',
    title: 'Consistent Builder',
    description: 'Maintained active development for 6+ months',
    icon: '⚡',
    condition: ({ monthsSinceFirst }) => monthsSinceFirst >= 6
  },
  {
    type: 'veteran',
    title: 'Bolt Veteran',
    description: 'Been building with Bolt for over a year',
    icon: '🎖️',
    condition: ({ monthsSinceFirst }) => monthsSinceFirst >= 12
  },
  {
    type: 'early_adopter',
    title: 'Early Adopter',
    description: 'Started using Bolt in its early days',
    icon: '🎯',
    condition: ({ monthsSinceFirst }) => monthsSinceFirst >= 18
  },
  {
    type: 'rising_star',
    title: 'Rising Star',
    description: 'Got your first star on a Bolt project',
    icon: '⭐',
    condition: ({ totalStars }) => totalStars >= 1
  },
  {
    type: 'community_favorite',
    title: 'Community Favorite',
    description: 'Received 10+ stars on your Bolt projects',
    icon: '🌠',
    condition: ({ totalStars }) => totalStars >= 10
  }
];

export function useGitHubData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [noBoltProjects, setNoBoltProjects] = useState(false);

  const headers = {
    'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  const getCommitCount = async (username: string, repo: string): Promise<number> => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/commits?per_page=1&page=1`,
        { headers }
      );

      const link = response.headers.get('Link');
      if (!link) return 0;

      const lastPage = link.match(/&page=(\d+)>; rel="last"/);
      if (!lastPage) return 0;

      return parseInt(lastPage[1], 10);
    } catch {
      return 0;
    }
  };

  const fetchData = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setUserData(null);
    setStats(null);
    setNoBoltProjects(false);

    try {
      // Fetch user data with auth
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`,
        { headers }
      );

      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Failed to fetch user data');
      }
      const githubUser = await userResponse.json();

      // Fetch repositories with auth
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=created`,
        { headers }
      );

      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const repos: GitHubRepo[] = await reposResponse.json();

      // Filter Bolt projects
      const boltRepos = repos.filter(repo =>
        repo.name.toLowerCase().includes('bolt') ||
        repo.description?.toLowerCase().includes('bolt') ||
        repo.topics?.some(topic => topic.includes('bolt'))
      );

      // Set user data
      setUserData({
        login: githubUser.login,
        name: githubUser.name || githubUser.login,
        avatar_url: githubUser.avatar_url
      });

      // If no Bolt projects found
      if (boltRepos.length === 0) {
        setNoBoltProjects(true);
        return;
      }

      // Calculate total commits
      const commitCounts = await Promise.all(
        boltRepos.map(repo => getCommitCount(username, repo.name))
      );
      const totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);

      // Calculate language statistics
      const languageMap = new Map<string, number>();
      boltRepos.forEach(repo => {
        if (repo.language) {
          languageMap.set(
            repo.language,
            (languageMap.get(repo.language) || 0) + 1
          );
        }
      });

      const totalLangCount = Array.from(languageMap.values()).reduce((a, b) => a + b, 0);
      const languages = Array.from(languageMap.entries())
        .map(([name, count]) => ({
          name,
          value: Math.round((count / totalLangCount) * 100)
        }))
        .sort((a, b) => b.value - a.value);

      // Sort repos by date
      const sortedRepos = [...boltRepos].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      const firstProject = sortedRepos[0];
      const latestProject = sortedRepos[sortedRepos.length - 1];

      const monthsSinceFirst = Math.round(
        (new Date().getTime() - new Date(firstProject.created_at).getTime()) /
        (1000 * 60 * 60 * 24 * 30)
      );

      // Calculate total stars
      const totalStars = boltRepos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

      // Calculate achievements using the new system
      const achievementData = {
        totalProjects: boltRepos.length,
        totalCommits,
        monthsSinceFirst,
        totalStars,
        languages
      };

      const achievements = ACHIEVEMENTS
        .filter(achievement => achievement.condition(achievementData))
        .map(({ type, title, description, icon }) => ({
          type,
          title,
          description,
          icon
        }));

      setStats({
        journey: {
          firstProject: {
            date: firstProject.created_at,
            name: firstProject.name
          },
          latestProject: {
            date: latestProject.created_at,
            name: latestProject.name
          },
          totalProjects: boltRepos.length,
          totalCommits
        },
        achievements,
        languages
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, userData, stats, noBoltProjects, fetchData };
}