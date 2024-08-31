import { defineStore } from 'pinia';
import { Cookies } from 'quasar';

interface User {
  companyName: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: Cookies.get('authToken') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
  actions: {
    login(userData: { token: string; user: User }) {
      this.token = userData.token;
      this.user = userData.user;

      Cookies.set('authToken', this.token, {
        expires: 1, // expires in 1 day
        secure: true,
        sameSite: 'Strict',
      });

      localStorage.setItem('user', JSON.stringify(this.user));
    },
    logout() {
      this.token = null;
      this.user = null;

      Cookies.remove('authToken');
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
