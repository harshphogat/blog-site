import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice'

import './App.css'
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      console.log(userData)
      if(userData){
        dispatch(login({userData : userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen w-full flex flex-wrap justify-center bg-gray-200'>
      <div className='w-full block'>
          <Header />  
            <Outlet />
          <Footer />
      </div>
    </div>
  ) : null


}

export default App
