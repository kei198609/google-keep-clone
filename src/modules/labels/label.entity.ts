// データの型定義
export class Label {
    id!: string;       //ラベルID
    userId!: string;   //ラベル作成したユーザID
    name!: string;     //ラベルの名前
    color!: string;    //ラベル自体の色の値

    constructor(data: Label) {
        Object.assign(this, data);
    }
}