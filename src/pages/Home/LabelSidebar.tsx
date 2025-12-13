import { FiTag, FiPlus, FiX } from 'react-icons/fi';

export default function LabelSidebar() {
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
            onClick={() => {}}
          >
            <FiPlus />
          </button>
        </div>

        <ul className="label-sidebar__list">
          <li className="label-sidebar__item">
            <div className="label-sidebar__label-btn">
              <span
                className="label-sidebar__label-color"
                style={{ backgroundColor: '#2196f3' }}
              ></span>
              <span className="label-sidebar__label-name">仕事</span>
            </div>
            <button
              className="label-sidebar__delete-btn"
              onClick={() => {}}
            >
              <FiX />
            </button>
          </li>
          <li className="label-sidebar__item">
            <div className="label-sidebar__label-btn">
              <span
                className="label-sidebar__label-color"
                style={{ backgroundColor: '#4caf50' }}
              ></span>
              <span className="label-sidebar__label-name">重要</span>
            </div>
            <button
              className="label-sidebar__delete-btn"
              onClick={() => {}}
            >
              <FiX />
            </button>
          </li>
          <li className="label-sidebar__item">
            <div className="label-sidebar__label-btn">
              <span
                className="label-sidebar__label-color"
                style={{ backgroundColor: '#f44336' }}
              ></span>
              <span className="label-sidebar__label-name">緊急</span>
            </div>
            <button
              className="label-sidebar__delete-btn"
              onClick={() => {}}
            >
              <FiX />
            </button>
          </li>
          <li className="label-sidebar__item">
            <div className="label-sidebar__label-btn">
              <span
                className="label-sidebar__label-color"
                style={{ backgroundColor: '#ffc107' }}
              ></span>
              <span className="label-sidebar__label-name">個人</span>
            </div>
            <button
              className="label-sidebar__delete-btn"
              onClick={() => {}}
            >
              <FiX />
            </button>
          </li>
        </ul>
      </aside>

      {/* モーダル表示 - コメントアウトを切り替えて表示/非表示を変更 */}
      {/* <LabelModal /> */}
    </>
  );
}
