import React, { useState, createContext, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './pages/Home/Home';
import MyAccount from './pages/MyAccount/MyAccount';
import Pets from './pages/Pets/Pets';
import Tasks from './pages/Tasks/Tasks';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isRModalOpen, setIsRModalOpen] = useState(false);

  const [userData, setUserData] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users/getinfo', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const json = await response.json();
          setUserData(json);
          setIsLoggedIn(true);
        }

        // else {
        //   setIsLoggedIn(false);
        // }

      } catch (err) {
        console.error('Błąd po stronie serwera:', err);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users/getinfo', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const json = await response.json();
          setUserData(json);
        }
      }
      catch (err) {
        console.error('Błąd po stronie serwera:', err);
      }
    };
    getUserData();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className='app__container'>
        <Router>
          <Navbar isRModalOpen={isRModalOpen} setIsRModalOpen={setIsRModalOpen} />
          <Routes>
            <Route path='/' element={isLoggedIn ? <Tasks /> : <Home setIsRModalOpen={setIsRModalOpen} />} />
            <Route path='/konto' element={
              isLoggedIn ? (
                <MyAccount userData={userData} setUserData={setUserData} />
              ) : (
                <Navigate replace to="/" />
              )
            } />
            <Route path='/zadania' element={
              isLoggedIn ? (
                <Tasks />
              ) : (
                <Navigate replace to="/" />
              )
            } />
            <Route path='/zwierzeta' element={
              isLoggedIn ? (
                <Pets />
              ) : (
                <Navigate replace to="/" />
              )
            } />
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
    </AuthContext.Provider>
  );
}

export default App;