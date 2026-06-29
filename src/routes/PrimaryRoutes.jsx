import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DeckPage from '../pages/DeckPage';
import FlowerPage from '../pages/FlowerPage';

export default function PrimaryRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deck" element={<DeckPage />} />
        <Route path="/flower" element={<FlowerPage />} />
      </Routes>
    </Router>
  );
}