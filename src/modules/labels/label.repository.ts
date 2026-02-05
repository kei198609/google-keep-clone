import api from "../../lib/api";
import { Label } from "./label.entity";

export const labelRepository = {
    async createLabel(name: string, color: string): Promise<Label> {
        const result = await api.post('/labels', { name, color });
        return new Label(result.data);
    },
    //ラベルの情報を取得する処理
    async getLabels(): Promise<Label[]> {
        const result = await api.get('/labels');
        return result.data.map((label: Label) => new Label(label));
    },
    //ラベル削除用api 引数に削除したいラベルのidを受け取るようにする
    async deleteLabel(id: string):Promise<void> {
        await api.delete(`/labels/${id}`); //ラベルを削除するのであれば、labels/1というURLにdeleteを送ると削除ができる
    },
};
