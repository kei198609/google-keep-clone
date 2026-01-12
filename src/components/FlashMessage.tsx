import { FiCheckCircle, FiX, FiXCircle } from 'react-icons/fi';
import './FlashMessage.css';
import { useUIStore } from '../modules/ui/ui.store';

export default function FlashMessage() {
  const { flashMessage, removeFlashMessage } = useUIStore();

  if (!flashMessage) return null; //グローバルステートのflashMessageになにも入っていない場合はnullを返す。なにも表示されないということ。値が入ると下のコンポーネントが表示される。

  return (
    <div className='flash-message-container'>
      <div className={`flash-message flash-message--${flashMessage.type}`}>
        <div className='flash-message__icon'>
          {flashMessage.type === 'error' ? <FiXCircle /> : <FiCheckCircle />}
        </div>
        <div className='flash-message__content'>メモを作成しました</div>
        <button className='flash-message__close' onClick={removeFlashMessage}>
          <FiX />
        </button>
      </div>
    </div>
  );
}

// {flashMessage.type === 'error' ? <FiXCircle /> : <FiCheckCircle />}
// エラーの場合、FiXCircleのコンポーネントを表示。成功の場合FiCheckCircleのコンポーネントを表示。
