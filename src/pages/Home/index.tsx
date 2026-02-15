import { FiPlus, FiLogOut } from 'react-icons/fi';
import SearchBar from './SearchBar';
import LabelSidebar from './LabelSidebar';
import NoteCard from './NoteCard';
import './Home.css';
import { userCurrentUserStore } from '../../modules/auth/current-user.store';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import NoteModal from './NoteModal';
import { useUIStore } from '../../modules/ui/ui.store';
import { noteRepository, type SaveNoteParams } from '../../modules/notes/note.repository';
import { useNoteStore } from '../../modules/notes/note.store';

export default function Home() {
  const { currentUser } = userCurrentUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addFlashMessage } = useUIStore();
  const { addNote } = useNoteStore();

  const createNote = async (params: SaveNoteParams) => {
    try {
      const newNote = await noteRepository.createNote(params); //note.repository.tsファイルを参照している
      addNote(newNote); //ストアに入れる処理
      addFlashMessage('メモを作成しました', 'success');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      addFlashMessage('メモの作成に失敗しました', 'error');
    }
  };

  // モーダルを閉じる処理
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!currentUser) return <Navigate to="/login" />; //ログインしていないとこのhome画面を見れないようにする。ログインしていないとlogin画面にリダイレクトさせる。

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
              onClick={() => setIsModalOpen(true)}
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
      {isModalOpen && <NoteModal onClose={closeModal} onSubmit={createNote} />}
    </div>
  );
}
