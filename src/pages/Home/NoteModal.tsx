import { FiX, FiImage, FiTag, FiCheck } from 'react-icons/fi';
import type { SaveNoteParams } from '../../modules/notes/note.repository';
import { useLabelStore } from '../../modules/labels/label.store';
import { useState } from 'react';
import { useUIStore } from '../../modules/ui/ui.store';
import { Note } from '../../modules/notes/note.entity';


interface NoteModalProps {
  onClose: () => void;
  onSubmit: (params: SaveNoteParams) => Promise<void>;
  note?: Note; //note?はNoteが渡ってきていない時というのは新規作成のメモを作成する時には、Noteは渡ってきてこないので、?をつけてあげて、Noteを渡しても渡さなくてもどちらでも良いという形のプロップスにしている。
}

export default function NoteModal( { onClose, onSubmit, note } : NoteModalProps) {
  const { labels } = useLabelStore();
  const [title, setTitle] = useState(note?.title || ''); //noteがあれば、そのtitleがステートの初期値になる。noteがなければ空文字が入って初期値になる。新規作成時にモーダルを開いた際は初期値が入っていない見た目にできる。
  const [content, setContent] = useState(note?.content || '');
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>(
    note?.labels.map((label) => label.id) || [] //noteがあれば、そのlabelsをmapで回して、idを取り出したlabelのidの配列を設定。noteがなければ、空の配列を設定。
  );
  //プレビュー用の画像を管理するステート。型はstringで初期値はnull
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    note?.imageUrl || null //noteのimageUrlがあればそれを使うし、なければnullを入れる。
  );
  const [imageFile, setImageFile] = useState<File | null>(null); //イメージファイル自体を保持するステート。型はFileで初期値はnull
  const { addFlashMessage } = useUIStore();

  //既に入っているものであればステートから取り除く処理
  const toggleLabel = (labelId: string) => { //クリックされたlabelIdを引数にとる
    if (selectedLabelIds.includes(labelId)) {  //もし選択されているラベルIDの一覧に、クリックされたラベルのIDが入っている場合
      setSelectedLabelIds((prev) => prev.filter((id) => id !== labelId)); //引数て渡ってきているlabelIdと一致しないものを取り出してステートにセットしなおしている
    } else {
      setSelectedLabelIds((prev) => [...prev, labelId]); //既存ステートの末にクリックされたラベルのidを追加する処理
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTyps = ['images/jpeg', 'image/png'];
    if (!allowedTyps.includes(file.type)){
      addFlashMessage('画像ファイルはJPEG、PNGのみ対応しています', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024){
      addFlashMessage('ファイルサイズは5MB以下にしてください', 'error');
      return;
    }

   //ファイルを読み取ってプレビュー用のURLを生成
    const reader = new FileReader(); //FileReaderはブラウザのAPIになっていてパソコン内のファイルを読み取ることができる
    reader.onloadend = () => { //onloadendでファイルの読み取りを完了した際の処理を設定できる
      setPreviewUrl(reader.result as string); //onloadendが呼ばれて、ファイルの読み取りが完了した際にはそのファイルのURLが入っているので、reader.resultをsetPreviewUrlに渡している
      setImageFile(file); //ファイル自体をセット
    };
    reader.readAsDataURL(file); //readAsDataURLはメソッド
  };

  //バツボタンクリックでプレビューを削除して、ファイルの選択状態もリセット
  const handleRemovePreview = () => {
    setPreviewUrl(null);
    setImageFile(null);
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
              {previewUrl ? (
                <div className='note-modal__image-preview'>
                  <img
                    src={previewUrl}
                    alt='プレビュー'
                    className='note-modal__image'
                  />
                  <button
                    className='note-modal__image-remove'
                    onClick={handleRemovePreview}
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <label className='note-modal__upload-btn'>
                  <FiImage />
                  <span>画像をアップロード</span>
                  <input
                    type='file'
                    accept='image/jpeg,image/png,image/gif'
                    onChange={ handleFileChange }
                    style={{ display: 'none' }}
                  />
                </label>
              )}
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
            onClick={() => onSubmit({
              title,
              content,
              labelIds: selectedLabelIds,
              imageFile: imageFile || undefined, //ステートに入っているimageFileファイルをapi側に渡す処理もしくはundefinedを渡す処理
            })
            }
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
