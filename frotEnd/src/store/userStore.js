import { create } from 'zustand';
import { getCurrentUser } from '../services/authService';

export const useUserStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Fetch current user data
  fetchCurrentUser: async () => {
    const { token } = get();
    if (!token) return;

    try {
      set({ loading: true, error: null });
      const response = await getCurrentUser();
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch user data',
        loading: false 
      });
      // If token is invalid, logout
      if (error.response?.status === 401) {
        get().logout();
      }
    }
  },

  // Clear error
  clearError: () => set({ error: null })
}));
