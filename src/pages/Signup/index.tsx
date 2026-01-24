import { Link, Navigate } from 'react-router-dom';
import './Signup.css';
import { useState } from 'react';
import { authRepository } from '../../modules/auth/auth.repository';
import { useUIStore } from '../../modules/ui/ui.store';
import { userCurrentUserStore } from '../../modules/auth/current-user.store';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addFlashMessage } = useUIStore();
  const [isLoading, setIsLoading] = useState(false); //ユーザ登録処理の最中にボタン連打された場合、apiに連続してリクエストをされたら良くないので、リクエストを送っている最中はボタンを押せないようにする。
  const { currentUser, setCurrentUser } = userCurrentUserStore();

  const signup = async () => {
    // サインアップ失敗時のバリデーション
    if (!name || !email || !password) {
      addFlashMessage('すべての項目を入力してください', 'error');
      return; //処理を抜ける。この先の処理を走らせないようにするため。
    }
    if(password.length < 8) {
      addFlashMessage('パスワードは８文字以上で入力してください', 'error');
      return; //処理を抜ける。
    }

    // api呼び出しエラーの際、エラーハンドリングのためtry,catchの中に入れている
    setIsLoading(true); //apiを叩く処理が始まった時、trueにする
    try {
      const { user, token } = await authRepository.signup(
        name,
        email,
        password
      ); //auth.repository.tsで書いたsignupメソッド
      localStorage.setItem('token', token); //アクセストークンがローカルストレージに保存
      setCurrentUser(user);
      addFlashMessage('アカウントを作成しました', 'success'); //フラッシュメッセージがsuccessの見た目で表示される
    } catch (error) {
      console.error(error);
      addFlashMessage('アカウント作成に失敗しました', 'error'); //失敗時にユーザに伝えるため
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) return <Navigate to="/" />; //ユーザ登録画面もcurrentUserがある場合はホーム画面にリダイレクト

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <div className='signup-card'>
          <div className='signup-header'>
            <div className='signup-logo'>
              <svg
                className='signup-logo-icon'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z' />
              </svg>
              <h1 className='signup-logo-text'>Google Keep Clone</h1>
            </div>
            <p className='signup-subtitle'>アカウントを作成</p>
          </div>

          <div className='signup-form'>
            <div className='form-group'>
              <label htmlFor='username' className='form-label'>
                ユーザー名
              </label>
              <input
                id='username'
                type='text'
                className='form-input'
                placeholder='山田太郎'
                value={name}
                onChange={(e) => setName(e.target.value)} //入力値が変更された時に都度呼ばれるメソッド.eに変更された値が入ってくるのでsetNameでnameステートに同期してあげている。
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email' className='form-label'>
                メールアドレス
              </label>
              <input
                id='email'
                type='email'
                className='form-input'
                placeholder='example@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password' className='form-label'>
                パスワード
              </label>
              <input
                id='password'
                type='password'
                className='form-input'
                placeholder='8文字以上'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type='button'
              className='btn btn-primary signup-submit-btn'
              onClick={signup} //11行目で定義した
              disabled={isLoading} //isLoadingがtrueの時は、disabledがtrueになってボタンが無効になる
            >
              アカウント作成
            </button>
          </div>

          <div className='signup-footer'>
            <p className='signup-footer-text'>
              既にアカウントをお持ちの方は
              <Link to='/login' className='signup-footer-link'>
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
