import type { InternalAxiosRequestConfig } from "axios";

//addAuthorizationHeaderはまずaxiosのインスタンスからconfigを受け取る。
export const addAuthorizationHeader = (
    config: InternalAxiosRequestConfig
) => {
    const token = localStorage.getItem('token'); //ローカルストレージに入っているtokenを探す
    if(!token) return config; //ストレージにtokenがない場合はconfigをそのまま返す
    config.headers.Authorization = `Bearer ${token}`; //tokenがある場合は、Authorizationにtokenを含めてあげて、
    return config; //そのtokenを含めたtokenを返す
};

