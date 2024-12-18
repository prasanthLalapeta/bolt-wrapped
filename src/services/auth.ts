import { GITHUB_API_BASE, GITHUB_TOKEN } from '../config/constants';

class AuthService {
  private token: string = GITHUB_TOKEN;

  isAuthenticated() {
    return !!this.token;
  }

  async getUserData() {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${GITHUB_API_BASE}/user`, {
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  }
}

export const authService = new AuthService();