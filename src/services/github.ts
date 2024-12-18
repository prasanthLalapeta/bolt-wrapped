import { GITHUB_API_BASE } from '../config/constants';
import { GitHubUser, Repository, Commit, LanguageStats, Collaborator } from '../types/github';

export class RateLimitError extends Error {
  constructor() {
    super('GitHub API rate limit exceeded');
    this.name = 'RateLimitError';
  }
}

const headers = {
  'Accept': 'application/vnd.github.v3+json',
};

async function githubFetch<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('github_token');
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers });
  
  if (response.status === 403) {
    throw new RateLimitError();
  }
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }
  
  return response.json();
}

export async function setGitHubToken(token: string): Promise<void> {
  localStorage.setItem('github_token', token);
}

export async function fetchUserData(username: string): Promise<GitHubUser> {
  return githubFetch<GitHubUser>(`/users/${username}`);
}

export async function fetchUserRepos(username: string): Promise<Repository[]> {
  const repos = await githubFetch<Repository[]>(`/users/${username}/repos?per_page=100`);
  const boltRepos = await Promise.all(
    repos.map(async (repo) => {
      try {
        await githubFetch(`/repos/${repo.full_name}/contents/.bolt`);
        return repo;
      } catch {
        return null;
      }
    })
  );
  return boltRepos.filter((repo): repo is Repository => repo !== null);
}

export async function fetchRepoCommits(repo: string, since: string): Promise<Commit[]> {
  return githubFetch<Commit[]>(
    `/repos/${repo}/commits?since=${since}&per_page=100`
  );
}

export async function fetchRepoLanguages(repo: string): Promise<LanguageStats> {
  return githubFetch<LanguageStats>(`/repos/${repo}/languages`);
}

export async function fetchRepoCollaborators(repo: string): Promise<Collaborator[]> {
  return githubFetch<Collaborator[]>(`/repos/${repo}/contributors`);
}