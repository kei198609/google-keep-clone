import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Note } from '../../modules/notes/note.entity';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) { // プロップスから受け取ってノートカードコンポーネントの中に伝えるようにする
  return (
    <div className='note-card'>
      { note.imageUrl && ( //imageUrlがある場合のみ、note-card__image-containerを表示
        <div className='note-card__image-container'>
          <img
            src={note.imageUrl}
            alt='メモの画像'
            className='note-card__image'
          />
        </div>
      )}
      <h3 className='note-card__title'>{note.title || '無題のメモ'}</h3>
      <p className='note-card__content'>{note.content}</p>
      <div className='note-card__labels'>
        {note.labels.map((label) => (
          <span
            key={label.id}
            className='note-card__label'
            style={{ backgroundColor: label.color }}
          >
            {label.name}
          </span>
        ))}
      </div>
      <div className='note-card__footer'>
        <span className='note-card__date'>{note.createdAt.toLocaleString()}</span>
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
