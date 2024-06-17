import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let navigate = useNavigate();

    const navigateToCreate = () => {
        navigate('/create');
    };

    const navigateToSearch = () => {
        navigate('/search');
    };

    return (
        <div>
            <button onClick={navigateToCreate}>飲み会を募集する</button>
            <button onClick={navigateToSearch}>飲み会を検索する</button>
        </div>
    );
};

export default Home;
