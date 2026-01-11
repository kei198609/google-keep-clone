import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import FlashMessage from './components/FlashMessage';

function App() {
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