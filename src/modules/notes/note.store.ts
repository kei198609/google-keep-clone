import { create } from "zustand"; //createはZustandでストアを作るための関数
import type { Note } from "./note.entity";

// 「このストアは何を持つか」 の設計図です。このストアは「notes という配列を必ず持つ」と TypeScript に約束しています。
interface NoteStore {
    notes: Note[]; //メモ一覧を格納する処理。Noteはnote.entity.tsで定義したやつ。
    isLoading: boolean;
    addNote: (note: Note) => void;
    setNotes: (notes: Note[]) => void;
    setIsLoading:(isLoading: boolean) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({ //create<NoteStore>は「このストアは NoteStore の形を満たします」と型で保証
    notes: [], //初期値を返すオブジェクト、アプリ起動時、ストアが作られた瞬間の初期値
    isLoading: false,
    addNote: (note: Note) => {
        set((state) => ({ notes: [note, ...state.notes] })); //setに渡されていくる関数の引数stateには、情報が入っているのでこれを...state.notesで末尾に展開してあげて、その先頭に新しいnoteを入れてあげると、引数に渡ってきた新しいNoteがステートの中の先頭に追加される。
    },
    setNotes: (notes: Note[]) => {
        set({ notes }); //引数に入っているNoteの配列でNoteStoreの中のnotesを全て書き換える処理
    },
    setIsLoading: (isLoading: boolean) => {
        set({ isLoading });
    },
}));