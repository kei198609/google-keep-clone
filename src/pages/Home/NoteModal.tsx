import { FiX, FiImage, FiTag, FiCheck } from 'react-icons/fi';
import type { SaveNoteParams } from '../../modules/notes/note.repository';
import { useLabelStore } from '../../modules/labels/label.store';
import { useState } from 'react';


interface NoteModalProps {
  onClose: () => void;
  onSubmit: (params: SaveNoteParams) => Promise<void>;
}

export default function NoteModal( { onClose, onSubmit } : NoteModalProps) {
  const { labels } = useLabelStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);

  //既に入っているものであればステートから取り除く処理
  const toggleLabel = (labelId: string) => { //クリックされたlabelIdを引数にとる
    if (selectedLabelIds.includes(labelId)) {  //もし選択されているラベルIDの一覧に、クリックされたラベルのIDが入っている場合
      setSelectedLabelIds((prev) => prev.filter((id) => id !== labelId)); //引数て渡ってきているlabelIdと一致しないものを取り出してステートにセットしなおしている
    } else {
      setSelectedLabelIds((prev) => [...prev, labelId]); //既存ステートの末にクリックされたラベルのidを追加する処理
    }
  };

  return (
    <div className='note-modal-overlay' onClick={onClose}>
      <div className='note-modal' onClick={(e) => e.stopPropagation()}>
        <div className='note-modal__header'>
          <h2 className='note-modal__title'>メモを入力</h2>
          <button className='icon-btn note-modal__close-btn' onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className='note-modal__body'>
          <div className='form-group'>
            <input
              type='text'
              className='form-input note-modal__title-input'
              placeholder='タイトル'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <textarea
              className='form-textarea note-modal__content-textarea'
              placeholder='メモを入力...'
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className='note-modal__labels-section'>
            <label className='note-modal__section-label'>
              <FiTag className='note-modal__section-icon' />
              ラベル
            </label>
            <div className='note-modal__labels'>
              {labels.map((label) => (
              <button
              key={label.id}
                className={`note-modal__label-tag ${selectedLabelIds.includes(label.id) ? 'note-modal__label-tag--selected' : ''}`}
                style={{
                  backgroundColor: selectedLabelIds.includes(label.id) ? label.color : 'transparent', //transparentは透明の意味
                  color: selectedLabelIds.includes(label.id) ? 'white' : label.color,
                  border: `2px solid ${label.color}`,
                }}
                onClick={() => toggleLabel(label.id)}
              >
                {selectedLabelIds.includes(label.id) && <FiCheck className="note-modal__label-check" />}
                {label.name}
              </button>
              ))}
            </div>
          </div>

          <div className='note-modal__images-section'>
            <label className='note-modal__section-label'>
              <FiImage className='note-modal__section-icon' />
              画像（1枚まで）
            </label>
            <div className='note-modal__images'>
              {/* 画像プレビュー表示バージョン - コメントアウトを切り替えて使用 */}
              {/* <div className='note-modal__image-preview'>
                <img
                  src='https://picsum.photos/400/300'
                  alt='プレビュー'
                  className='note-modal__image'
                />
                <button
                  className='note-modal__image-remove'
                  onClick={() => {}}
                >
                  <FiX />
                </button>
              </div> */}

              {/* 画像アップロードボタン表示バージョン */}
              <label className='note-modal__upload-btn'>
                <FiImage />
                <span>画像をアップロード</span>
                <input
                  type='file'
                  accept='image/jpeg,image/png,image/gif'
                  onChange={() => {}}
                  style={{ display: 'none' }}
                  disabled
                />
              </label>
            </div>
          </div>
        </div>

        <div className='note-modal__footer'>
          <button
            className='btn btn-secondary'
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className='btn btn-primary'
            onClick={() => onSubmit({ title, content, labelIds: selectedLabelIds })}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
