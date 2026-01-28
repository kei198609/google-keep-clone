import api from '../../lib/api';
import { User } from '../users/user.entity';

// apiにリクエストを送り処理。postリクエストをauth/signupのURLに送る処理。
export const authRepository = {
    async signup(
        name: string,
        email: string,
        password: string
    ): Promise<{ user: User; token: string }> {
        const result = await api.post('/auth/signup', { name, email, password });
        const { user, token } = result.data; //リクエストが成功すると結果がresultのdataに入ってくるので、dataに含まれるuserとtokenを変数に代入
        return { user: new User(user), token };
    },
    async signin(
        email: string,
        password: string
    ): Promise<{ user: User; token: string }> {
        const result = await api.post('/auth/signin', { email, password });
        const { user, token } = result.data;
        return { user: new User(user), token };
    },

    async getCurrentUser(): Promise<User | null> {
        const result = await api.get('/auth/me'); //auth/meとすることで現在ログインしているユーザを取得できる
        if(!result.data) return null; //result.dataに値が帰ってこない場合は明示的にnullを返すようにしてあげる
        return new User(result.data); //値が帰ってきている場合は、result.dataをUserエンティティに渡してあげて、Userエンティティのインスタンスとして返す
    },
};