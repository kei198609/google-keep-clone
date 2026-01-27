import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import FlashMessage from './components/FlashMessage';
import { userCurrentUserStore } from './modules/auth/current-user.store'; //
import { authRepository } from './modules/auth/auth.repository';
import { useEffect, useState } from 'react';

function App() {
  const { setCurrentUser } = userCurrentUserStore(); //グローバルステートに値を入れたいので、setCurrentUserを取得している。
  const [isLoading,setIsLoading] = useState(true);

  //fetchCurrentUserがコンポーネントが最初に表示されたタイミングで動かしたいのでuseEffectを使う。
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser()
      setCurrentUser(user); //グローバルステートにuserの値をいれる
    } catch (error) {
      console.error(error);
    } finally{
      setIsLoading(false) //isLoadingは初期値はtrueになっているのでfalseにしている。
    }
  };

  if(isLoading) return null; //isLoadingがtrueのままだったらnullを返す。isLoadingがtrueだと下層の処理に行かせないようにしている。

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <FlashMessage />
    </BrowserRouter>
  );
}

export default App;


// <FlashMessage />はフラッシュメッセージコンポーネント（FlashMessage.tsxファイル）呼び出し
// どの画面でもフラッシュメッセージが出せるよう設置