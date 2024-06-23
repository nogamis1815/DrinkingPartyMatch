import React, { useState } from 'react';

interface SearchProps {
  onSearch: (prefecture: string, gender: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [prefecture, setPrefecture] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const handleSearch = () => {
    onSearch(prefecture, gender);
  };

  return (
    <div>
      <h2>検索条件</h2>
      <div>
        <label>県:</label>
        <input 
          type="text" 
          value={prefecture} 
          onChange={(e) => setPrefecture(e.target.value)} 
        />
      </div>
      <div>
        <label>性別:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">選択してください</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
      </div>
      <button onClick={handleSearch}>検索</button>
    </div>
  );
};

export default Search;
