import { create } from "zustand";
import type { Label } from "./label.entity";

interface LabelStore {
    labels: Label[];
    addLabel: (label: Label) => void;
}

export const useLabelStore = create<LabelStore>((set, get) => ({
    labels: [],
    addLabel: (label: Label) => {
        set({ labels: [...get().labels, label] });
    },
}));


// labels 配列をグローバルに管理
// addLabel による ラベル追加機能
// Zustand を使った 責務が明確な状態管理