// stores/useLanguageStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: {
        code: 'en',
        name: 'English',
        flag: '🇬🇧',
      },
      currency: {
        code: 'AMD',
        name: 'Armenian Dram',
      },
      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (curr) => set({ currency: curr }),
    }),
    {
      name: 'app-settings-storage', // نام key در localStorage
    }
  )
);