import { useEffect, useState } from 'react';
import { FiTag, FiPlus, FiX } from 'react-icons/fi';
import LabelModal from '../../components/LabelModal';
import { useUIStore } from '../../modules/ui/ui.store';
import { labelRepository } from '../../modules/labels/label.repository';
import { useLabelStore } from '../../modules/labels/label.store';

export default function LabelSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false); //モーダルを表示するかしないかのステートを作る
  const { addFlashMessage } = useUIStore();
  const { addLabel, setLabels, labels, removeLabel } = useLabelStore();

  // fetchLabelsをコンポーネントが最初にレンダリングされたタイミングで実行したいので
  useEffect(() => {
    fetchLabels();
  }, []);

  // api処理
  const fetchLabels = async () => {
    try {
      const labels = await labelRepository.getLabels(); //apiから取得した値がlabelsに入る
      setLabels(labels); //apiから取得した値をsetLabelsを使ってグローバルステートに値をセット
    } catch (error) {
      console.error(error);
      addFlashMessage('ラベルの取得に失敗しました', 'error');
    }
  };

  const createLabel = async (name: string, color: string) => {
    try {
      const newLabel = await labelRepository.createLabel(name, color); //apiを叩いて作成したラベルの情報がnewLabelに入っている
      addLabel(newLabel);
      addFlashMessage('ラベルを作成しました', 'success');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      addFlashMessage('ラベル作成に失敗しました', 'error');
    }
  };

  const deleteLabel = async (labelId: string) => {
    try {
      await labelRepository.deleteLabel(labelId); //削除処理をapiを叩いて呼び出してあげている
      removeLabel(labelId); //削除処理が無事終わったら、ストアからもラベルの情報を削除
      addFlashMessage('ラベルを削除しました', 'success');
    } catch (error) {
      console.error(error);
      addFlashMessage('ラベルの削除に失敗しました', 'error');
    }
  };

  return (
    <>
      <aside className="label-sidebar">
        <div className="label-sidebar__header">
          <h3 className="label-sidebar__title">
            <FiTag className="label-sidebar__title-icon" />
            ラベル
          </h3>
          <button
            className="icon-btn label-sidebar__add-btn"
            onClick={() => {setIsModalOpen(true)}}
          >
            <FiPlus />
          </button>
        </div>

        <ul className="label-sidebar__list">
          {labels.map((label) => (

          <li key={label.id} className="label-sidebar__item">
            <div className="label-sidebar__label-btn">
              <span
                className="label-sidebar__label-color"
                style={{ backgroundColor: label.color }}
              ></span>
              <span className="label-sidebar__label-name">{label.name}</span>
            </div>
            <button
              className="label-sidebar__delete-btn"
              onClick={() => deleteLabel(label.id)}
            >
              <FiX />
            </button>
          </li>
          ))}

        </ul>
      </aside>

      {/* モーダル表示 - コメントアウトを切り替えて表示/非表示を変更 src/componentsにあるLabelModal.tsxに書いてある */}
      {/* isModalOpenがtrueになった時、LabelModalが表示される */}
      {isModalOpen && <LabelModal onClose={() => setIsModalOpen(false)} onSave={createLabel}/>}
    </>
  );
}
