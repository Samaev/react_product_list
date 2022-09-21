import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ProductInfo } from './components/ProductInfo';
import { ProductsList } from './components/ProductsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route path="/" element={<ProductsList/>}></Route>
        <Route path="/:id" element={<ProductInfo/>}></Route>
      </Routes>
      </header>
    </div>
  );
}

export default App;
