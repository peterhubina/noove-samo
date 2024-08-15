import { defineStore } from 'pinia';
import { Cookies } from 'quasar';

interface User {
  companyName: string;
  email: string;
  // Add other user fields as needed
}

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
  actions: {
    login(userData: { token: string; user: User }) {
      this.token = userData.token;
      this.user = userData.user;

      // Store token in a secure cookie
      Cookies.set('authToken', this.token, {
        expires: 1, // expires in 1 day
        secure: true,
        sameSite: 'Strict',
      });

      // Optionally store user data in localStorage
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    logout() {
      this.token = null;
      this.user = null;

      // Remove token from cookies
      Cookies.remove('authToken');

      // Remove user data from localStorage
      localStorage.removeItem('user');
    },
    checkAuth() {
      const token = Cookies.get('authToken');
      const user = localStorage.getItem('user');

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      } else {
        this.logout();
      }
    },
  },
});
