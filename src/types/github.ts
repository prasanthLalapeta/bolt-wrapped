export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  public_repos: number;
}

export interface Repository {
  name: string;
  full_name: string;
  created_at: string;
  pushed_at: string;
  language: string;
  default_branch: string;
}

export interface Commit {
  sha: string;
  commit: {
    author: {
      date: string;
    };
    message: string;
  };
  stats?: {
    additions: number;
    deletions: number;
  };
}

export interface LanguageStats {
  [key: string]: number;
}

export interface Collaborator {
  login: string;
  avatar_url: string;
  contributions: number;
}