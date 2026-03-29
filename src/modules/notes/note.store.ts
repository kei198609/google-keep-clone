import { create } from "zustand"; //createはZustandでストアを作るための関数
import type { Note } from "./note.entity";

// 「このストアは何を持つか」 の設計図です。このストアは「notes という配列を必ず持つ」と TypeScript に約束しています。
interface NoteStore {
    notes: Note[]; //メモ一覧を格納する処理。Noteはnote.entity.tsで定義したやつ。
    isLoading: boolean;
    page: number; //ページネーション関連。今何ページ目のデータを表示しているのかをステートで管理したいので追加
    hasMore: boolean; //ページネーション関連。最後のページなのかを示すものになる。hasMoreがtrueの場合、まだ次のページがあるよというところを示す。falseになると最後のページを表示しているということで、これ以上ページはとれないことを表す。
    searchQuery: string;//インプットに入力されて検索ワードを保持するところをNoteStoreに作ってあげる
    addNote: (note: Note) => void;
    setNotes: (notes: Note[]) => void;
    setIsLoading:(isLoading: boolean) => void;
    removeLabelFromNotes: (labelId: string) => void; //ラベルを削除したときストアからも削除させるため紐づける処理
    replaceNote: (id: string, newValue: Note) => void;
    removeNote: (id: string) => void; //指定したidのメモの情報をstoreから削除する
    addNotes: (notes: Note[]) => void; //ページネーション関連。末尾に追加してあげるかつ配列でまとめて追加してあげるものを実装していくようなイメージ。ページネーション関連。
    resetNotes: () => void; //ページネーション関連。NoteStoreの値を全てリセットするようなメソッド
    setPage: (page: number) => void; //ページネーション関連。pageをセットするメソッド。引数に取った値を新しくNoteStoreに入れてあげる内容
    setHasMore: (hasMore: boolean) => void; //ページネーション関連。hasMoreをセットするメソッド。引数に取った値を新しくNoteStoreに入れてあげる内容
    setSearchQuery: (query: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({ //create<NoteStore>は「このストアは NoteStore の形を満たします」と型で保証
    notes: [], //初期値を返すオブジェクト、アプリ起動時、ストアが作られた瞬間の初期値
    isLoading: false,
    page: 1,
    hasMore: true,
    searchQuery: '', //初期値はからの文字列
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
    // 既存のstoreに入っているnotes(state.notes)を取得し、
    // filterを使って削除対象のidと一致しないnoteだけを残すことで
    // 指定されたidのメモを配列から除外する。
    // その新しいnotes配列をsetでstoreに保存している。
    removeNote: (id:string) => {
        set((state) => ({
            // state.notesは現在storeに入っているメモ一覧
            // note.id: 配列内の各メモのID
            // id: 削除対象のメモID（引数）
            // filterで削除対象(id)と一致しないメモだけ残し、新しい配列を作ってstoreを更新する
            notes: state.notes.filter((note) => note.id !== id), //!==は一致しないものを残す。一致しなければtrueが返る。filter はtrue のものだけ残すメソッド
        }));
    },
    addNotes: (notes: Note[]) => {
        set((state) => ({ notes: [...state.notes, ...notes] })); //引数notesの取ったNoteの配列を末尾に追加する実装
    },
    resetNotes: () => {
        set( {notes: [], page: 1, hasMore: true}); //これは元のデフォルト値に戻す感じの実装。notesは空の配列,pageは１、hasMoreはtrue
    },
    setPage: (page: number) => {
        set({ page }); //引数pageで取った値を直接。
    },
    setHasMore: (hasMore: boolean) => {
        set({ hasMore }); //引数hasMoreで取った値を直接。
    },
    setSearchQuery: (searchQuery: string) => {
        set({ searchQuery }); //引数searchQueryで取った値を直接。
    },
}));

//set((state) => ({ ... }))はstate から現在の notes を取得