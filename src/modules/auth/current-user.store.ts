// グローバルステートにログインしたユーザの情報を入れる処理
import { create } from "zustand";
import type { User } from "../users/user.entity";


interface CurrentUserStore {
    currentUser: User | null; //currentUserに値が入っていればログインしていますし、nullの場合はログインしていない
    setCurrentUser: (user: User | null) => void; //currentUserの引数にユーザの情報を渡せば、そのユーザの情報がグローバルストアに入るし、nullを渡せばログインしていない状態になるイメージ
}

//ストアに値が入りエクスポートされる
export const userCurrentUserStore = create<CurrentUserStore>((set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }), //引数にuserを取って、取ったuserの情報をcurrentUserに入れる
}));