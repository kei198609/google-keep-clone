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
        total: number;
        page: number;
        limit: number;
        totalPages: number;
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
    async getNotes(): Promise<NotesResponse> { //返り値の型を指定
        const result = await api.get('/notes'); //メモの一覧とページネーション関連のデータも返ってくる
        return { //awaitから帰ってきた情報をreturn
            notes: result.data.notes.map((note: Note) => new Note(note)), //mapを使ってひとつづつ取り出して、new Note(note)で全てnoteエンティティのインスタンスに変換してreturnしている
            pagination: result.data.pagination,
        };
    },
};