import { Label } from "../labels/label.entity";

export class Note {
    id!: string;
    userId!: string; //メモを作成したユーザのID
    title?: string;
    content?: string;
    imageUrl?: string; //メモには画像を添付できるようにしてあるのでその画像のURL
    createdAt!: Date; //メモ作成時間
    updatedAt!: Date; //メモ更新時間
    labels: Label[] = [];

    constructor(data: Note) {
        Object.assign(this, data);
        this.createdAt = new Date(data.createdAt); //apiからは文字列として返してくるのでdate型にするためDateインスタンスにしている処理
        this.updatedAt = new Date(data.updatedAt); //apiからは文字列として返してくるのでdate型にするためDateインスタンスにしている処理
        this.labels = data.labels.map((label) => new Label(label)); //labelsを一つ一つ取り出し、Labelインスタンスに変換した上で、labelsに入れている
    }
}