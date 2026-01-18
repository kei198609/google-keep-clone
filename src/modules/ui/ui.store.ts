import { create } from 'zustand';

// グローバルステートの定義

// 成功、失敗メッセージ
export interface FlashMessage {
    message: string;
    type: FlashMessageType;
}

type FlashMessageType = 'success' | 'error';

//グローバルステートの値自体とメッセージを更新処理。アプリのどこからでも使えるようにするため。
interface UIStore {
    flashMessage: FlashMessage | null; //値があれば、メッセージ表示、nullなら表示しない
    addFlashMessage: (message: string, type: FlashMessageType) => void; //フラッシュメッセージを表示する際に、UIStoreのflashMessageに引数を使って値を入れる関数。
    removeFlashMessage: () => void; //メッセージを消す時の関数。引数は不要。
}

let flashMessageTimer: number | null = null; //型の指定。setTimeoutはnumberを返してくるので、number or nullで、初期値はnull

// Zustandのライブラリにcreateというメソッドがあるのでそれを使う
// 初期値を返す関数。オブジェクトが初期値として、UIStoreで使えるものになる。
export const useUIStore = create<UIStore>((set) => ({
    flashMessage: null,
    addFlashMessage: (message: string, type: FlashMessageType) => {
        if (flashMessageTimer) {
            clearTimeout(flashMessageTimer); //タイマーリセット処理。もしflashMessageTimerに値が入っていたら、clearTimeoutメソッドでタイマークリア。これを書かないとタイマーが並行して起動してしまう。
            flashMessageTimer = null; //値の初期化
        }
        set({
            flashMessage: { message, type },
        });
        // 3秒後に消える。nullに書き換える処理。
        flashMessageTimer = setTimeout(() => {
            set({ flashMessage: null}); //3秒後に消える。nullに書き換える。
            flashMessageTimer = null; //タイマーも3秒後のタイミングでいらなくなるのでnullを渡して初期化
        }, 3000);
    },

    removeFlashMessage: () => {
        if (flashMessageTimer) {
            clearTimeout(flashMessageTimer);
            flashMessageTimer = null;
        }
        set({ flashMessage: null });
    },
}));