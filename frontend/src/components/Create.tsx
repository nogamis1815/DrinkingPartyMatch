import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css';

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
  const [prefecture, setPrefecture] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [town, setTown] = useState<string>('');

  const navigate = useNavigate();

  const handleZipcodeSearch = () => {
    axios.get(`/api/address?zipcode=${zipcode}`)
      .then(response => {
        const { prefecture, city, town } = response.data;
        setAddress(response.data);
        setPrefecture(prefecture);
        setCity(city);
        setTown(town);
      })
      .catch(error => {
        console.error('Error fetching address:', error);
      });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // これでデフォルトのフォーム送信動作を防ぎます

    axios.post('/api/events', {
      zipcode,
      prefecture,
      city,
      town,
      gender,
      participants,
      age
    })
    .then(response => {
      console.log('Event created:', response.data);
      setZipcode('');
      setAddress(null);
      setPrefecture('');
      setCity('');
      setTown('');
      setGender('');
      setParticipants('');
      setAge('');
      navigate('/');
    })
    .catch(error => {
      console.error('Error creating event:', error);
    });
  };

  return (
    <div className="container">
      <h1>飲み会を募集する</h1>
      <div>
        <label>郵便番号:</label>
        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
        <button type="button" onClick={handleZipcodeSearch}>住所を取得</button>
      </div>
      {address && (
        <div className="address">
          <div>
            <label>県:</label>
            <input type="text" value={prefecture} onChange={(e) => setPrefecture(e.target.value)} />
          </div>
          <div>
            <label>市区町村:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" value={town} onChange={(e) => setTown(e.target.value)} />
          </div>
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
      <button type="button" onClick={handleSubmit}>募集する</button>
    </div>
  );
};

export default Create;
