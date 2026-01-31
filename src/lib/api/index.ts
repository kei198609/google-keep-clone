import axios from 'axios';
import { addAuthorizationHeader } from './interceptors/request';

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });
// axiosがapiを叩く際にリクエストを送るが、リクエストにはヘッダーの部分があるので、ヘッダーに設定の部分があるのでその部分を更新して、
// Content-Typeをjsonの形式でリクエスト、レスポンスのやりとりを行う設定。
api.defaults.headers.common['Content-Type'] = 'application/json';
api.interceptors.request.use(addAuthorizationHeader); //addAuthorizationHeaderが毎回リクエストを送る時に、実行されるようになるので、アクセストークンが存在していれば、そのトークンをヘッダーに入れたうえで、毎回apiを叩いてくれる
export default api;




//メモ
//api.post('/auth/signup')
//みたいに書くと、baseURLのlocalhost:8888/auth/signupにリクエストを送ることになる

