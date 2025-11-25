import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import MainNav from './components/mainNav.jsx';


function App() {
  return (
    <Router>
      <MainNav />
    </Router>
  );
}

export default App;


