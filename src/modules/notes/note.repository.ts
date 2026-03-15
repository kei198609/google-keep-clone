import api from "../../lib/api";
import { Note } from "./note.entity";

//引数が多いのと他のインターフェースで使い回すので別途interfaceを作る
export interface SaveNoteParams {
    title?: string; //メモのタイトル
    content?: string; //コンテントの内容
    labelIds?: string[]; //紐づけるラベルのIDを配列で渡す
    imageFile?: File; //紐づける画像
}

export interface NotesResponse {
    notes: Note[];
    pagination: {
        total: number; //全部で何件のメモがデータベース上にあるかという数値が入る
        page: number; //返したメモの一覧が何ページ目のメモの一覧なのかというものを返す
        limit: number; //１ページあたり何件づつ取得する結果を返す。
        totalPages: number; //全部で何件あるよというところに対して、何ページで表示しきるよというところを示している。
    };
}

export const noteRepository = {
    async createNote(params: SaveNoteParams): Promise<Note> {
        const formDate = new FormData(); //JSON ({}) ではファイルを送れない。テキスト＋画像 → FormData が必要
        if (params.title) formDate.append('title', params.title); //title が存在するときだけ、FormData に追加する
        if (params.content) formDate.append('content', params.content); //content が存在するときだけ、FormData に追加する
        if (params.labelIds && params.labelIds.length > 0) //labelIds が存在していて、かつ中身が1つ以上あるときだけ true
            formDate.append('labelIds', JSON.stringify(params.labelIds)); //labelIds があれば JSON文字列にしてFormData に追加する
        if (params.imageFile) formDate.append('image', params.imageFile); //imageFile があれば画像としてFormData に追加する

        const result = await api.post('/notes', formDate,{
            headers: {
                'Content-Type': 'multipart/form-data', //Content-Typeを上書きして、multipart/form-dataを使ってリクエストすることができるようになる
            },
        });
        return new Note(result.data); //リクエストが成功したら、result.dataに作成したNoteの内容が入っているので、Noteエンティティのインスタンスにして返す
    },
    //メモの一覧をバックエンドから取ってくる関数
    async getNotes(page: number = 1, limit: number = 12): Promise<NotesResponse> { //返り値の型を指定。pageとlimitは引数。値は初期値。ページネーションのやつで何ページ目の情報を取得したいかというところと取得したいページの情報の件数を指定
        const result = await api.get('/notes', { params: { page, limit } }); //メモの一覧とページネーション関連のデータも返ってくる
        return { //awaitから帰ってきた情報をreturn
            notes: result.data.notes.map((note: Note) => new Note(note)), //mapを使ってひとつづつ取り出して、new Note(note)で全てnoteエンティティのインスタンスに変換してreturnしている
            pagination: result.data.pagination,
        };
    },
    // メモの更新用のapiを叩くメソッド
    async updateNote(id: string, params: SaveNoteParams): Promise<Note> { //アップデートするメモのidを引数に渡す、
        const formDate = new FormData(); //JSON ({}) ではファイルを送れない。テキスト＋画像 → FormData が必要
        if (params.title) formDate.append('title', params.title); //title が存在するときだけ、FormData に追加する
        if (params.content) formDate.append('content', params.content); //content が存在するときだけ、FormData に追加する
        if (params.labelIds && params.labelIds.length > 0) //labelIds が存在していて、かつ中身が1つ以上あるときだけ true
            formDate.append('labelIds', JSON.stringify(params.labelIds)); //labelIds があれば JSON文字列にしてFormData に追加する
        if (params.imageFile) formDate.append('image', params.imageFile); //imageFile があれば画像としてFormData に追加する

        const result = await api.put(`/notes/${id}`, formDate,{ //putリクエストは更新の時に使われるリクエスト
            headers: {
                'Content-Type': 'multipart/form-data', //Content-Typeを上書きして、multipart/form-dataを使ってリクエストすることができるようになる
            },
        });
        return new Note(result.data); //リクエストが成功したら、result.dataに作成したNoteの内容が入っているので、Noteエンティティのインスタンスにして返す
    },
    async deleteNote(id: string) :Promise<void> {
        await api.delete(`/notes/${id}`); //削除するapiになるので、削除したものはデータ自体もなくなるのでapiから値が返ってこないのでreturnするものはなし。
    },
};