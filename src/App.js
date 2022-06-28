import React from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
