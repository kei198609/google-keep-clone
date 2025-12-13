import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-bar__icon">
        <FiSearch />
      </div>
      <input
        type="text"
        className="search-bar__input"
        placeholder="メモを検索..."
        value=''
        onChange={() => {}}
      />
    </div>
  );
}
