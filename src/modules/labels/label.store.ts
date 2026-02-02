import { create } from "zustand";
import type { Label } from "./label.entity";

//このストアはなにを持つか、どんな操作ができるかを決めている。
interface LabelStore {
    labels: Label[];
    addLabel: (label: Label) => void;
    setLabels: (labels: Label[]) => void; // 引数：Label[] 戻り値：void（何も返さない）Label の配列を受け取って、状態を更新する関数が存在する」と約束しているだけです。
}

export const useLabelStore = create<LabelStore>((set, get) => ({
    labels: [],
    addLabel: (label: Label) => {
        set({ labels: [...get().labels, label] });
    },
    setLabels: (labels: Label[]) => {
        set({ labels }); //ストアの labels を、引数で受け取った labels に丸ごと置き換える
    },
}));

// メモ
// labels 配列をグローバルに管理
// addLabel による ラベル追加機能
// Zustand を使った 責務が明確な状態管理

// メモ
// interface の setLabels	「こういう関数があるよ」という宣言
// 実装の setLabels	実際に state を更新する処理
// set({ labels })	labels を丸ごと置き換える
// 使いどころ	API取得後 / 初期化 / リセット