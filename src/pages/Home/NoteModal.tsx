import { FiX, FiImage, FiTag, FiCheck } from 'react-icons/fi';

export default function NoteModal() {
  return (
    <div className='note-modal-overlay' onClick={() => {}}>
      <div className='note-modal' onClick={(e) => e.stopPropagation()}>
        <div className='note-modal__header'>
          <h2 className='note-modal__title'>メモを入力</h2>
          <button className='icon-btn note-modal__close-btn' onClick={() => {}}>
            <FiX />
          </button>
        </div>

        <div className='note-modal__body'>
          <div className='form-group'>
            <input
              type='text'
              className='form-input note-modal__title-input'
              placeholder='タイトル'
              value=''
              onChange={() => {}}
            />
          </div>

          <div className='form-group'>
            <textarea
              className='form-textarea note-modal__content-textarea'
              placeholder='メモを入力...'
              rows={8}
              value=''
              onChange={() => {}}
            ></textarea>
          </div>

          <div className='note-modal__labels-section'>
            <label className='note-modal__section-label'>
              <FiTag className='note-modal__section-icon' />
              ラベル
            </label>
            <div className='note-modal__labels'>
              <button
                className='note-modal__label-tag'
                style={{
                  backgroundColor: 'transparent',
                  color: '#2196f3',
                  border: '2px solid #2196f3',
                }}
                onClick={() => {}}
              >
                仕事
              </button>
              <button
                className='note-modal__label-tag'
                style={{
                  backgroundColor: 'transparent',
                  color: '#4caf50',
                  border: '2px solid #4caf50',
                }}
                onClick={() => {}}
              >
                重要
              </button>
              <button
                className='note-modal__label-tag'
                style={{
                  backgroundColor: 'transparent',
                  color: '#f44336',
                  border: '2px solid #f44336',
                }}
                onClick={() => {}}
              >
                緊急
              </button>
              <button
                className='note-modal__label-tag'
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffc107',
                  border: '2px solid #ffc107',
                }}
                onClick={() => {}}
              >
                個人
              </button>
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
            onClick={() => {}}
          >
            キャンセル
          </button>
          <button
            className='btn btn-primary'
            onClick={() => {}}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
