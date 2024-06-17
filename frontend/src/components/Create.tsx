import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';  // CSSファイルをインポート

interface Address {
  prefecture: string;
  city: string;
  town: string;
}

const Create: React.FC = () => {
  const [zipcode, setZipcode] = useState<string>('');
  const [address, setAddress] = useState<Address | null>(null);
  const [gender, setGender] = useState<string>('');
  const [participants, setParticipants] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const handleZipcodeSearch = () => {
    axios.get(`/api/address?zipcode=${zipcode}`)
      .then(response => {
        setAddress(response.data);
      })
      .catch(error => {
        console.error('Error fetching address:', error);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      console.error('Address not set');
      return;
    }

    axios.post('/api/events', {
      prefecture: address.prefecture,
      region: `${address.city} ${address.town}`,
      gender,
      participants,
      age
    })
    .then(response => {
      console.log('Event created:', response.data);
      setZipcode('');
      setAddress(null);
      setGender('');
      setParticipants('');
      setAge('');
    })
    .catch(error => {
      console.error('Error creating event:', error);
    });
  };

  return (
    <div className="container">
      <h1>飲み会を募集する</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>郵便番号:</label>
          <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
          <button type="button" onClick={handleZipcodeSearch}>住所を取得</button>
        </div>
        {address && (
          <div className="address">
            <div>県: {address.prefecture}</div>
            <div>市区町村: {address.city} {address.town}</div>
          </div>
        )}
        <div>
          <label>性別:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>
        <div>
          <label>人数:</label>
          <input type="number" value={participants} onChange={(e) => setParticipants(e.target.value)} />
        </div>
        <div>
          <label>年齢:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit">募集する</button>
      </form>
    </div>
  );
};

export default Create;
