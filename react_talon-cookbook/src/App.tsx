import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Categories/>} />
          <Route path="/:categoryID" element={<Recipes/>}/>
          <Route path="/recipes/:recipeID" element={<Recipe/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
