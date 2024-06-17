import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Event {
  id: number;
  zipcode: string;
  prefecture: string;
  city: string;
  town: string;
  participants: number;
  age: number;
  gender: string;
  photo?: string;
  remarks?: string;
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        axios.get('/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const navigateToCreate = () => {
        navigate('/create');
    };

    const navigateToSearch = () => {
        navigate('/search');
    };

    return (
        <div>
            <h1>ホーム</h1>
            <button onClick={navigateToCreate}>飲み会を募集する</button>
            <button onClick={navigateToSearch}>飲み会を検索する</button>
            
            <h2>飲み会一覧</h2>
            {events.length === 0 ? (
                <p>現在、登録された飲み会はありません。</p>
            ) : (
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            <h3>{event.prefecture} {event.city} {event.town}</h3>
                            <p>性別: {event.gender}</p>
                            <p>人数: {event.participants}</p>
                            <p>年齢: {event.age}</p>
                            {event.remarks && <p>備考: {event.remarks}</p>}
                            {event.photo && <img src={`/storage/${event.photo}`} alt="飲み会の写真" style={{ maxWidth: '200px', height: 'auto' }} />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;
