import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './pages/Home';
import Capabilities from './pages/Capabilities';
import HowItWorks from './pages/HowItWorks';
import Constellation from './pages/Constellation';
import Portal from './pages/Portal';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/constellation" element={<Constellation />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
