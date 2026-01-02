import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });
// axiosがapiを叩く際にリクエストを送るが、リクエストにはヘッダーの部分があるので、ヘッダーに設定の部分があるのでその部分を更新して、
// Content-Typeをjsonの形式でリクエスト、レスポンスのやりとりを行う設定。
api.defaults.headers.common['Content-Type'] = 'application/json';
export default api;

//api.post('/auth/signup')
//みたいに書くと、baseURLのlocalhost:8888/auth/signupにリクエストを送ることになる

