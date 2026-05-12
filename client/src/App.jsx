import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from 'react';

import Home from './pages/Home';
import Contact from './pages/Contact.jsx';




function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
