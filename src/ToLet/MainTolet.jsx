import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ToLet from './Pages/ToLet';
import Details from './Pages/Details';

function MainTolet() {
  return (
    <Routes>
      <Route path="/" element={<ToLet />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  )
}

export default MainTolet