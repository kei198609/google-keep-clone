import { create } from "zustand";

// これは 画像プレビュー用storeが持つ「状態」と「操作関数」の型定義
// このstoreには、こういう値と関数を持たせます と TypeScript に教えています。
interface ImagePreviewState {
    previewImageUrl: string | null; //画像プレビューで表示する画像URL
    openPreview: (imageUrl: string) => void; //画像プレビューを開くための関数です。　=> void は、この関数は戻り値を返さない という意味
    closePreview: () => void; //画像プレビューを閉じるための関数です.引数はありません。
}

//画像プレビューの状態と、それを変更する関数をまとめた共通の状態置き場を作っているという意味
export const useImagePreviewStore = create<ImagePreviewState>((set) => ({
    previewImageUrl: null, //現在プレビュー表示する画像URLです。最初は何も表示しないので null です。

    openPreview: (imageUrl) => set({ previewImageUrl: imageUrl}), //画像プレビューを開く関数です。画像URLを受け取って、previewImageUrl にセットします。
    closePreview: () => set({ previewImageUrl: null }), //画像プレビューを閉じる関数です。previewImageUrl を null に戻します。
}));