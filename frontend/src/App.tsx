import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // ホームコンポーネントのインポート
import Create from './components/Create'; // 飲み会を募集するページのコンポーネント
import Search from './components/Search'; // 飲み会を検索するページのコンポーネント

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    );
};

export default App;
