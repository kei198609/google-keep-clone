import { FiCheckCircle, FiX } from 'react-icons/fi';
import './FlashMessage.css';

export default function FlashMessage() {
  return (
    <div className='flash-message-container'>
      <div className='flash-message flash-message--success'>
        <div className='flash-message__icon'>
          <FiCheckCircle />
        </div>
        <div className='flash-message__content'>メモを作成しました</div>
        <button className='flash-message__close' onClick={() => {}}>
          <FiX />
        </button>
      </div>
    </div>
  );
}
