import { MODE } from '@/types';
import { ReactNode } from 'react';
import { create } from 'zustand';

export const useTopbarStore = create<TTopbarState>((set) => ({
  search: '',
  isSearchbarShown: false,
  headerTitle: '',
  headerChild: null,
  updateSearch: (value: string) => set({ search: value }),
  updateHeaderTitle: (title: string) => set({ headerTitle: title }),
  updateHeaderChild: (child: ReactNode | null) => set({ headerChild: child }),
  updateIsSearchbarShown: (value: boolean) => set({ isSearchbarShown: value }),
  mode: MODE.PATHOLOGY,
  updateMode: (mode: MODE) => set({ mode }),
}));

// types
type TTopbarState = {
  search: string;
  isSearchbarShown: boolean;
  headerTitle: string;
  headerChild: ReactNode | null;
  updateSearch(value: string): void;
  updateHeaderTitle(title: string): void;
  updateHeaderChild(child: ReactNode | null): void;
  updateIsSearchbarShown(value: boolean): void;
  mode: MODE;
  updateMode(mode: MODE): void;
};
