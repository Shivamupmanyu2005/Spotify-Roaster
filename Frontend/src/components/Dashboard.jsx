import React, {useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTopTracks, getRecentTracks } from '../services/api';
import { UserProfile, TrackCard, LoadingSpinner } from './index';
import jokeSound from "../assets/sounds/joke-drums.mp3"
const Dashboard = () => {
  const UserProfileRef = useRef();

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);

  const [topTracks, setTopTracks] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user && authLoading === false) {
      navigate('/');
    }
  }, [user, navigate, authLoading]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const [topTracksResponse, recentTracksResponse] = await Promise.all([
            getTopTracks(),
            getRecentTracks(),
          ]);


          const limitedTopTracks = topTracksResponse?.data?.items?.slice(0, 5) || [];
          const limitedRecentTracks = recentTracksResponse?.data?.items?.slice(0, 5) || [];

          setTopTracks({ items: limitedTopTracks });

          setRecentTracks({ items: limitedRecentTracks });
        } catch (err) {
          console.error(`Failed to fetch dashboard data due to:`, err);
          setError('Failed to fetch dashboard data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const generateRoastHandler = () => {
    const audio = new Audio(jokeSound);
    audio.play();
    navigate('/roastresult');

    

  };

  useEffect(() => {
    if(loading == false && !error){

      gsap.from(UserProfileRef.current, {
        opacity: 0,
        scale:2,
        rotate:-15,
        x: -50,
        y: 20,
        duration: 1,
        ease: 'back.out(1.7)',
      })

    }
  },[loading,error])

  useEffect(() => {
    if(!loading && !error) {
      const tl = gsap.timeline();
      tl.from('.track-card-title', {
        opacity: 0,
        x:-20,
        duration: 0.5
      })
      .from('track-item', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        stagger: 0.05,
        duration: 0.6,
         ease: "back.out(1.7)"
      }, '-=0.3')
    }
  },[error,loading])

  return (
    <div className='main-container bg-linear-320 from-blue-500 via-black to-blue-900 text-black flex flex-col items-center align-middle pb-5 '>
      {
        authLoading ? (
          <LoadingSpinner />
        ) : loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className='text-red-600'>{error}</div>
        ) : (
          <>
            {user && <UserProfile ref={UserProfileRef} user={user} />}

            <div className='tracks-cards-container'>
              <TrackCard tracks={topTracks} title="Your Top Tracks" />
              <TrackCard tracks={recentTracks} title="Your Recent Tracks" />
            </div>
            <button
              onClick={generateRoastHandler}
              className='border-3 border-double font-display border-white text-white rounded-full p-3 shadow-2xl text-shadow-lg text-shadow-red-500 cursor-alias text-2xl shadow-fuchsia-600 '
            >
              Generate Roast
            </button>
          </>
        )
      }
    </div>
  );
};

export default Dashboard;