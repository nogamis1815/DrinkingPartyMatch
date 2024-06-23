import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Create from './Create';
import Search from './Search';

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
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
    const [searchModalIsOpen, setSearchModalIsOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get('/api/events')
            .then(response => {
                setEvents(response.data);
                setFilteredEvents(response.data); // 初期状態では全イベントを表示
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    };

    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalIsOpen(false);
    };

    const openSearchModal = () => {
        setSearchModalIsOpen(true);
    };

    const closeSearchModal = () => {
        setSearchModalIsOpen(false);
    };

    const handleSearch = (prefecture: string, gender: string) => {
        const filtered = events.filter(event => {
            return (
                (prefecture === '' || event.prefecture.includes(prefecture)) &&
                (gender === '' || event.gender === gender)
            );
        });
        setFilteredEvents(filtered);
        closeSearchModal();
    };

    return (
        <div>
            <h1>ホーム</h1>
            <button onClick={openCreateModal}>飲み会を募集する</button>
            <button onClick={openSearchModal}>飲み会を検索する</button>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>飲み会一覧</h2>
                    <div>
                        {filteredEvents.length === 0 ? (
                            <p>現在、登録された飲み会はありません。</p>
                        ) : (
                            <ul>
                                {filteredEvents.map(event => (
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
                </div>
            </div>
            
            <Modal
                isOpen={createModalIsOpen}
                onRequestClose={closeCreateModal}
                contentLabel="Create Event Modal"
            >
                <Create onClose={closeCreateModal} onEventCreated={fetchEvents} />
                <button onClick={closeCreateModal}>Close</button>
            </Modal>

            <Modal
                isOpen={searchModalIsOpen}
                onRequestClose={closeSearchModal}
                contentLabel="Search Event Modal"
            >
                <Search onSearch={handleSearch} />
                <button onClick={closeSearchModal}>Close</button>
            </Modal>
        </div>
    );
};

export default Home;
