const TOKEN_KEY = 'six-cities-token';

export const tokenService = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  remove(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { 'X-Token': token } : {};
  },
};
