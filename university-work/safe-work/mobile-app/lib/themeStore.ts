import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  toggleDarkMode: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setIsDarkMode: (isDark: boolean) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  fontSize: 'medium',
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setFontSize: (size) => set({ fontSize: size }),
  setIsDarkMode: (isDark) => set({ isDarkMode: isDark }),
}));

export default useThemeStore;
