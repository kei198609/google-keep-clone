import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) { //PropsからonSearchを使えるように取り出している
  //inputがonChangeで変わった時に入力されている値を同期するステートを用意
  const [inputValue, setInputValue] = useState('');

  //inputValueが変わったタイミングでonSearchが呼ばれて、inputに入っている値が渡される
  useEffect(() => {
    onSearch(inputValue);
  }, [inputValue]);

  return (
    <div className="search-bar">
      <div className="search-bar__icon">
        <FiSearch />
      </div>
      <input
        type="text"
        className="search-bar__input"
        placeholder="メモを検索..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} //e.target.valueは入力された文字。setInputValueでstate更新。
      />
    </div>
  );
}
