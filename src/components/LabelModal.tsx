import { FiX } from 'react-icons/fi';
import './LabelModal.css';

const LABEL_COLORS = [
  { name: '赤', value: '#f44336' },
  { name: '青', value: '#2196f3' },
  { name: '緑', value: '#4caf50' },
  { name: '黄', value: '#ffc107' },
  { name: '紫', value: '#9c27b0' },
  { name: '灰', value: '#9e9e9e' },
];

export default function LabelModal() {
  return (
    <div className='label-modal-overlay' onClick={() => {}}>
      <div className='label-modal' onClick={(e) => e.stopPropagation()}>
        <div className='label-modal__header'>
          <h2 className='label-modal__title'>新しいラベル</h2>
          <button
            className='icon-btn label-modal__close-btn'
            onClick={() => {}}
          >
            <FiX />
          </button>
        </div>

        <div className='label-modal__body'>
          <div className='form-group'>
            <label htmlFor='label-name' className='form-label'>
              ラベル名
            </label>
            <input
              id='label-name'
              type='text'
              className='form-input'
              placeholder='ラベル名を入力（最大30文字）'
              maxLength={30}
              value=''
              onChange={() => {}}
              autoFocus
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>色</label>
            <div className='label-modal__colors'>
              {LABEL_COLORS.map((color) => (
                <button
                  key={color.value}
                  className={'label-modal__color-option'}
                  style={{ backgroundColor: color.value }}
                  onClick={() => {}}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='label-modal__footer'>
          <button className='btn btn-secondary' onClick={() => {}}>
            キャンセル
          </button>
          <button
            className='btn btn-primary'
            onClick={() => {}}
            disabled={true}
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
}
