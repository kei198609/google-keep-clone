import { create } from "zustand"; //createはZustandでストアを作るための関数
import type { Note } from "./note.entity";

// 「このストアは何を持つか」 の設計図です。このストアは「notes という配列を必ず持つ」と TypeScript に約束しています。
interface NoteStore {
    notes: Note[]; //メモ一覧を格納する処理。Noteはnote.entity.tsで定義したやつ。
    isLoading: boolean;
    addNote: (note: Note) => void;
    setNotes: (notes: Note[]) => void;
    setIsLoading:(isLoading: boolean) => void;
    removeLabelFromNotes: (labelId: string) => void; //ラベルを削除したときストアからも削除させるため紐づける処理
    replaceNote: (id: string, newValue: Note) => void;
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
    removeLabelFromNotes: (labelId: string) => {
        set((state) => ({
            notes: state.notes.map((note) => ({ //notesの値をmapで回して一つ一つ取り出してあげます。
                ...note, //labels以外のプロパティは変えないので、引数に渡ってきたnoteを展開してそのまま入れてあげている
                //ラベルのみ再度取り出して、filterで全て回してあげて、引数に渡されている削除対象のlabelId以外のものをlabelsに入れ直した上で、
                //その情報をnotesの中に再度入れて上書きしている。削除対象のラベルがあれば、それを消してステートの中に新しく入れ直している
                labels: note.labels?.filter((label) => label.id !== labelId) || [],
            })),
        }));
    },
    // 既存のstate.notesの中身がmapで一つ一つまわって、引数に渡ってきたidと一致するもの（更新対象）のnoteがあれば引数にnewValueを入れる。
    // それ以外（更新対象外）はそのまま入れてあげて、mapで配列を作り直してnotesストアの中にセットしなおしているという実装。
    replaceNote(id: string, newValue: Note) {
        set((state) => ({
            notes: state.notes.map((note) => (note.id === id ? newValue : note)),
        }));
    },
}));