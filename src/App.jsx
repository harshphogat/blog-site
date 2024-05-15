import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice'

import './App.css'
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import { combineSlices } from '@reduxjs/toolkit';
import Home from './pages/Home';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      console.log("USER DATA IN APP :",userData)
      if(userData){
        console.log("LOGIN TRIED IN APP: ");
        dispatch(login({userData : userData}))
      }
      else{
        console.log("LOGOUT CALLED IN APP")
        dispatch(logout())
        console.log("APP AFTER LOGOUT DISPATCHED");
      }
    })
    .finally(() => setLoading(false))
  }, [])

  console.log("LOADING STATE, ", loading);

  return !loading ? (
    <div className='min-h-screen w-full flex flex-wrap justify-center bg-gray-200'>
      <div className='w-full block'>
          <Header /> 
            {/* <Outlet />
             */}

             <Home />
          <Footer />
      </div>
    </div>
  ) : null


}

export default App
