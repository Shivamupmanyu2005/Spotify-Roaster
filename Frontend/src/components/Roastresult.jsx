import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { generateRoast } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import { logoutUser } from '../services/api';

const Roastresult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [roastData, setRoastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = async() => {
    await logoutUser();
    dispatch(logout());
    navigate('/');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const fetchRoast = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await generateRoast();
        setRoastData(data);
      } catch (err) {
        console.error("Failed to fetch roast:", err);
        setError("Failed to get your roast. The AI might be tired or taking a break.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoast();
  }, []);

  useEffect(() => {
    if (roastData) {
      gsap.set('.emoji', {
        opacity: 0,
        y: 0,
        left: () => Math.random() * window.innerWidth,
        xPercent: -50
      });

      const tl = gsap.timeline();

      tl.to('.emoji', {
          y: -300,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power1.out'
        })
        .to('.emoji', {
          y: -600,
          opacity: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power2.in'
        }, '-=1.0');
    }
  }, [roastData]);

  return (
    <div className='roast-container relative flex flex-col items-center align-middle gap-14 p-4 sm:p-8 md:p-24 lg:p-48 font-display text-white text-center bg-linear-180 from-black via-black to-gray-800 min-h-screen'>

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-30">
          <LoadingSpinner />
          <p className="mt-4 text-xl">Generating your brutal roast...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900 bg-opacity-75 z-30 text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button
            onClick={goToDashboard}
            className='dashboard-button mt-6 border-4 border-white p-4 cursor-pointer'
          >
            Back to Dashboard
          </button>
        </div>
      )}

      {!isLoading && !error && roastData && (
        <>
          <div className="relative z-20 flex flex-col items-center w-full max-w-4xl">
            <h1 className='text-3xl text-shadow-lg text-shadow-green-500 text-blue-800 underline'>Your Spotify Roast!</h1>
            <div className='flex flex-row gap-4 sm:gap-8 md:gap-16 my-8'>
              <button onClick={goToDashboard} className='dashboard-button border-4 border-white p-4 cursor-pointer'>Dashboard</button>
              <button onClick={handleLogout} className='border-4 border-red-600 p-4 cursor-pointer'>Logout</button>
            </div>
            <p className='roast-text border-5 border-dotted rounded-lg p-4 sm:p-6 shadow-2xl shadow-purple-700 border-purple-600 text-shadow-lg text-shadow-gray-500 whitespace-pre-line'>
              {roastData.roastText}
            </p>
          </div>

          <div className='emoji-container absolute inset-0 overflow-hidden z-10'>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
            <span className='emoji text-2xl absolute bottom-0'>😂</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Roastresult;