import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './pages/Home/Home';
import MyAccount from './pages/MyAccount/MyAccount';
import Pets from './pages/Pets/Pets';
import Tasks from './pages/Tasks/Tasks';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className='app__container'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={isLoggedIn ? <Tasks /> : <Home />} />
          <Route path='/konto' element={<MyAccount />} />
          <Route path='/zadania' element={<Tasks />} />
          <Route path='/zwierzeta' element={<Pets />} />
          <Route path='*' element={
            isLoggedIn ? (
              <Navigate replace to="/zadania" />
            ) : (
              <Navigate replace to="/" />
            )
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
