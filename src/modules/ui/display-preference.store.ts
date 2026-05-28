import { create } from 'zustand';

export type SortKey = 'newest' | 'oldest' | 'title';
// 表示切り替えの state
export type ViewMode = 'grid' | 'list';
export type ThemeMode = 'light' | 'dark';

interface DisplayPreferenceState {
    viewMode: ViewMode;
    sortKey: SortKey;
    theme: ThemeMode;
    setViewMode: (viewMode: ViewMode) => void;
    setSortKey: (sortKey: SortKey) => void;
    setTheme: (theme: ThemeMode) => void;
}

export const useDisplayPreferenceStore = create<DisplayPreferenceState>((set) => ({
    viewMode: 'grid',
    sortKey: 'newest',
    theme: 'light',

    setViewMode: (viewMode) => set({ viewMode }),
    setSortKey: (sortKey) => set({ sortKey }),
    setTheme: (theme) => set({ theme }),
}));