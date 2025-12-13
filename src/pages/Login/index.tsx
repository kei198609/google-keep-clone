import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-card'>
          <div className='login-header'>
            <div className='login-logo'>
              <svg
                className='login-logo-icon'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z' />
              </svg>
              <h1 className='login-logo-text'>Google Keep Clone</h1>
            </div>
            <p className='login-subtitle'>メモアプリにログイン</p>
          </div>

          <div className='login-form'>
            <div className='form-group'>
              <label htmlFor='email' className='form-label'>
                メールアドレス
              </label>
              <input
                id='email'
                type='email'
                className='form-input'
                placeholder='example@example.com'
                value=''
                onChange={() => {}}
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
                placeholder='パスワードを入力'
                value=''
                onChange={() => {}}
              />
            </div>

            <button
              type='button'
              className='btn btn-primary login-submit-btn'
              onClick={() => {}}
            >
              ログイン
            </button>
          </div>

          <div className='login-footer'>
            <p className='login-footer-text'>
              アカウントをお持ちでない方は
              <Link to='/signup' className='login-footer-link'>
                新規登録
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
