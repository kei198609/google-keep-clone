import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Note } from '../../modules/notes/note.entity';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  viewMode: 'grid' | 'list';
}

export default function NoteCard({ note, onEdit, onDelete, viewMode }: NoteCardProps) { // プロップスから受け取ってノートカードコンポーネントの中に伝えるようにする
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); //stopPropagationを呼ぶことで、ゴミ箱ボタンだけを押された処理だけを読んで、その後のイベントの処理を行える。ゴミ箱ボタンはノートカードに重なっているので、ノードカードをクリックした処理も一緒に走るのを防ぐ役割。
    onDelete(note.id);
  };
  return (
    <div
    className={viewMode === 'grid' ? 'note-card' : 'note-card note-card--list'}
    onClick={() => onEdit(note)}
    >
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
          <button className='icon-btn note-card__action-btn' onClick={handleDelete}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
