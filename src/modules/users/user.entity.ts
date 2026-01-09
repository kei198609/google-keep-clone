// データの型定義
// constructorの箇所は、引数に渡されたdata（id,name,email）のオブジェクトを使って、Userクラスのインスタンスを生成して返すという内容
export class User {
    id!: string;
    name!: string;
    email!: string;
    constructor(data: User) {
        Object.assign(this, data);
    }
}