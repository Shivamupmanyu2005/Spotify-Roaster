import { useState, useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { Outlet } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { checkAuthStatus } from './store/authSlice'
import { FaSpotify } from "react-icons/fa";
import  url from './utils.js'

import './App.css'

function App() {
const dispatch = useDispatch();
const authLoading = useSelector((state) => state.auth.loading);
const user = useSelector((state) => state.auth.user);



useEffect(() => {
  dispatch(checkAuthStatus());
},[dispatch])
  return (
    <>
    {authLoading ? (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingSpinner/>
      </div>
    ): user ? (
      <Outlet />
    )
    : (
   
    <div className=' min-h-screen flex flex-col items-center justify-center bg-[linear-gradient(to_right,theme(--color-black)_10%,theme(--color-green-800)_25%,theme(--color-green-600)_50%,theme(--color-emerald-600)_75%,theme(--color-black)_90%)]'>

      <h1 className='font-display text-5xl font-bold text-white text-shadow-lg text-shadow-red-900'>Roast My</h1>

      <h3 className='font-display text-5xl font-bold text-white text-shadow-lg text-shadow-red-900'>Spotify</h3>
      <br></br>

      <span className='text-xl text-white font-sunset text-shadow-lg text-shadow-gray-200'>Our Al will brutally dismantle your musical identity based on your</span>
      <span className='text-xl text-white font-sunset text-shadow-lg text-shadow-gray-200'>listening habits. Are you brave enough to face the truth?</span>


      <div className='pt-30'>
        <button onClick={() => window.location.href = `${url}/login` } className='flex flex-row items-center justify-center  rounded-full bg-white p-2 border-2 border-dotted border-red-600 shadow-xl  shadow-red-600'>
          <FaSpotify />
          <span className='p-2'>Login with Spotify</span>
        </button>
      </div>
      



    </div>
     )}
    </>
  )
}

export default App
