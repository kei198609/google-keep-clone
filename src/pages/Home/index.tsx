import { FiPlus, FiLogOut } from 'react-icons/fi';
import SearchBar from './SearchBar';
import LabelSidebar from './LabelSidebar';
import NoteCard from './NoteCard';
import './Home.css';

export default function Home() {
  return (
    <div className='home'>
      <header className='home-header'>
        <div className='home-header__left'>
          <div className='home-header__logo'>
            <svg
              className='home-header__logo-icon'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z' />
            </svg>
            <span className='home-header__logo-text'>Google Keep Clone</span>
          </div>
          <SearchBar />
        </div>
        <div className='home-header__right'>
          <span className='home-header__user'>テストユーザー</span>
          <button
            className='icon-btn home-header__logout-btn'
            onClick={() => {}}
          >
            <FiLogOut />
          </button>
        </div>
      </header>

      <div className='home-main'>
        <LabelSidebar />

        <main className='home-content'>
          <div className='home-content__header'>
            <h2 className='home-content__title'>すべてのメモ</h2>
            <button
              className='btn btn-primary home-content__add-btn'
              onClick={() => {}}
            >
              <FiPlus />
              <span>新しいメモ</span>
            </button>
          </div>

          {/* メモ一覧 - NoteCardコンポーネントを使用 */}
          <div className='notes-grid'>
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </div>

          {/* <div className='loading' style={{ textAlign: 'center', padding: '20px' }}>
            読み込み中...
          </div> */}

          {/* <div className='no-more' style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            全てのメモを表示しました
          </div> */}

          {/* <div className='no-notes'>
            <p>メモがありません</p>
            <p>新しいメモを作成してみましょう</p>
          </div> */}
        </main>
      </div>
    </div>
  );
}
