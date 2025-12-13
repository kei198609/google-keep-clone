import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function NoteCard() {
  return (
    <div className='note-card'>
      <div className='note-card__image-container'>
        <img
          src='https://picsum.photos/400/300'
          alt='メモの画像'
          className='note-card__image'
        />
      </div>
      <h3 className='note-card__title'>旅行の計画</h3>
      <p className='note-card__content'>
        来月の沖縄旅行について調べる。ホテルと航空券の予約を確認。
      </p>
      <div className='note-card__labels'>
        <span
          className='note-card__label'
          style={{ backgroundColor: '#2196f3' }}
        >
          仕事
        </span>
        <span
          className='note-card__label'
          style={{ backgroundColor: '#4caf50' }}
        >
          重要
        </span>
      </div>
      <div className='note-card__footer'>
        <span className='note-card__date'>2025-01-15</span>
        <div className='note-card__actions'>
          <button className='icon-btn note-card__action-btn'>
            <FiEdit2 />
          </button>
          <button className='icon-btn note-card__action-btn' onClick={() => {}}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
