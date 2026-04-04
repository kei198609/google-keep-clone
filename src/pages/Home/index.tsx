import { FiPlus, FiLogOut } from 'react-icons/fi';
import SearchBar from './SearchBar';
import LabelSidebar from './LabelSidebar';
import NoteCard from './NoteCard';
import './Home.css';
import { userCurrentUserStore } from '../../modules/auth/current-user.store';
import { Navigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import NoteModal from './NoteModal';
import { useUIStore } from '../../modules/ui/ui.store';
import { noteRepository, type SaveNoteParams } from '../../modules/notes/note.repository';
import { useNoteStore } from '../../modules/notes/note.store';
import type { Note } from '../../modules/notes/note.entity';



export default function Home() {
  const { currentUser } = userCurrentUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addFlashMessage } = useUIStore();
  const {
    addNote,
    notes,
    setNotes,
    isLoading,
    setIsLoading,
    replaceNote,
    removeNote,
    addNotes,
    resetNotes,
    page,
    hasMore,
    setPage,
    setHasMore,
    searchQuery,
    setSearchQuery,
  } = useNoteStore();
  const limit = 12;
  const [editingNote, setEditingNote] = useState<Note | null>(null); //型はNoteまたはnull。初期値はnull。
  const loadMoreRef = useRef<HTMLDivElement | null>(null); //無限スクロール関連。監視要素とそのrefを作成。
  //コンポーネント表示時に一回だけ呼び出したいのでuseEffectの中で呼び出す
  useEffect(() => {
    fetchNotes();
    // コンポーネントがアンマウント（画面遷移など）されるときに、
    // ノートの状態を初期化して次回表示時にデータがリセットされた状態にする。resetしないと起きる問題は、前のメモが残ってるので、重複表示や途中ページから始まる挙動バグが起きる
    return () => {
      resetNotes();
    };
  }, [searchQuery]);
  //ページが１、２ページ目だろうが、fetchNotesを呼び出すことで、取得できるようにしている。
  //isLoadingがtrueの時だけでなく、hasMoreがfalseの時（次のページが無い時）取得する必要がないので、returnを返すようにする。
  const fetchNotes = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await noteRepository.getNotes(page, limit, searchQuery);
      if (page === 1) {
        setNotes(response.notes); //setNotesを使ってストアに入れる処理
      } else {
        addNotes(response.notes); //2ページ目を取得した際、setNotesはもともと入っていた1ページ目の既存のステートの値を上書きしてしまう。1ページ目以外はaddNotesを使う。
      }
      setPage(page + 1);
      //response.paginationは例えばバックエンドから{ page: 1, totalPages: 3}というデータが返ってきます。
      // 1 < 3 → trueとなります。つまりまだ先のページがあるので → hasMore = trueとなります。次ページあるか判定していて、trueならhasMore更新して、hasMore=falseならもうfetchしないということ。
      setHasMore(response.pagination.page < response.pagination.totalPages);
    } catch (error) {
      console.error(error);
      addFlashMessage('メモの取得に失敗しました', 'error');
    } finally {
      setIsLoading(false); //falseにしてローディング状態を解除
    }
  };

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

  //カードがクリックされた時の処理を作る。クリックされたカードに紐づているメモの情報をステートに入れてあげて、その情報をモーダル内に表示させる
  const handleCardClick = (note: Note) => { //クリックされたNoteのデータを引数にとる
    setEditingNote(note); //上の処理でクリックされたNoteのデータをsetEditingNoteステートに入れる処理
    setIsModalOpen(true); //モーダルをオープンにする処理
  }


  // モーダルを閉じる処理
  const closeModal = () => {
    setEditingNote(null); //リセット処理
    setIsModalOpen(false);
  };

  //　メモ編集
  const updateNote = async (params: SaveNoteParams) => {
    if(!editingNote) return; //editingNoteがない場合はアップデートできないようにしたいのでリターンにする。
    try {
      //editingNoteのidと一致するメモの情報がparamsに入力された内容でアップデートされて、
      //apiのリクエストが成功するとアップデートされたメモの情報がupdatedNoteに入る。
      const updatedNote = await noteRepository.updateNote(
        editingNote.id,
        params
      );
      replaceNote(editingNote.id, updatedNote); //replaceNoteを使ってストアの中身も更新する
      addFlashMessage('メモを更新しました', 'success');
      setEditingNote(null);
      setIsModalOpen(false); //モーダルの状態をリセット
    } catch (error) {
      console.error(error);
      addFlashMessage('メモの更新に失敗しました', 'error');
    }
  };

  const deleteNote = async (id: string) => { //削除するメモのidが渡ってくる
    if(!window.confirm('このメモを削除しますか？')) return; //確認が画面に表示される。はいを押すとwindow.confirmはtrueを返す。いいえを押すとfalseを返す。
    //以下trueとなった場合の処理
    try {
      await noteRepository.deleteNote(id);
      removeNote(id);
      addFlashMessage('メモを削除しました', 'success');
    } catch (error) {
      console.error(error);
      addFlashMessage('メモの削除に失敗しました', 'error');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  //無限スクロール関連
  //entriesに監視対象の要素が入っていて
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]; //要素は一つしかないので0番目を取得することで、divがtargetの中に入っているわけなんですけども
      if (target.isIntersecting && hasMore && !isLoading) { //target.isIntersectingはtargetは表示された時にtrueになる。かつhasMoreがtrueかつisLoadingがfalse（ロードしていない状態）であれば、
        fetchNotes(); //fetchNotesを読んで次のページを表示してあげる。
      }
    });

    if (loadMoreRef.current) { //loadMoreRefのcurrentが存在する場合、
      observer.observe(loadMoreRef.current); //observeという関数にloadMoreRefのcurrentを渡すことでloadMoreRefに渡されているdivを監視し始めることができる
    }
    // useEffectのクリーンアップ処理
    // コンポーネントの再描画 or アンマウント時に監視を解除する
    // （解除しないとobserverが重複して、fetchが複数回呼ばれるバグになる）
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, isLoading]);

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
          <SearchBar onSearch={handleSearch}/>
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
            {notes.map((note) => ( //
              <NoteCard
              key={note.id}
              note={note}
              onEdit={handleCardClick}
              onDelete={deleteNote}
              /> //noteにmapの引数になっているnoteを渡すことでnotesに入っているメモの数だけmapが回って、NoteCardにそれぞれのメモの情報が渡されて表示されるようになる
            ))}
          </div>
          <div ref = {loadMoreRef} style = {{ height: '20px'}} />

          {isLoading && (
            <div className='loading' style={{ textAlign: 'center', padding: '20px' }}>
              読み込み中...
            </div>
          )}
          {/* 最後のページを表示した時の機能。hasMoreがfalseかつnotesのlengthが0以上だったときに表示させる */}
          {!hasMore && notes.length > 0 && (
            <div className='no-more' style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              全てのメモを表示しました
            </div>
          )}


          {/* <div className='no-notes'>
            <p>メモがありません</p>
            <p>新しいメモを作成してみましょう</p>
          </div> */}
        </main>
      </div>
      {isModalOpen && (
        <NoteModal
          onClose={closeModal}
          onSubmit={editingNote ? updateNote : createNote} //editingNoteがない時は新規の作成になるのでcreateNote、ある時はモーダルはアップデートにつかわれるのでupdateNote
          note={editingNote || undefined}
        />
      )}
    </div>
  );
}
