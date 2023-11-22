import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home/Home';
import MyAccount from './pages/MyAccount/MyAccount';
import Pets from './pages/Pets/Pets';
import Tasks from './pages/Tasks/Tasks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/konto' element={<MyAccount/>} />
          <Route path='/zadania' element={<Tasks/>} />
          <Route path='/zwierzeta' element={<Pets/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
