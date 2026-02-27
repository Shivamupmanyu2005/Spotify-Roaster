import React from 'react';
import gsap from 'gsap';

const TrackCard = ({ tracks, title }) => {
  const trackList = tracks?.items || [];

  const handleMouseEnter = (e) => {

    const img = e.currentTarget.querySelector('.track-album-image');

    gsap.to(img, {
      rotate: 360,
      duration: 3,
      ease: 'elastic.out(1.3,0)',
      scale: 0.5,
      boxShadow: "0px 10px 30px rgba(0,255,0,0.3)",
      y: -10,
      skewX: -20
    })


    
  }

  const handleMouseOut = (e) => {
     const img = e.currentTarget.querySelector('.track-album-image');

      gsap.to(img, {
      rotate: 0,
      scale: 1.03,
      duration: 3,
      skewX: 0,
    })



  }

  return (
    <div className='track-card-section   p-6 flex flex-row items-center align-middle justify-center '>
      <h2 className='track-card-title text-sm font-display text-white'>{title}</h2>
      <div className='tracks-list flex flex-row items-center justify-center p-4  gap-14 text-white  font-display text-sm  overflow-hidden '>
        {trackList.map((item, index) => {
          // Determine if the track details are nested under 'item.track'
          const actualTrack = item.track || item;

          // Make sure we have an ID for the key, fallback to index if needed
          const key = actualTrack.id || `track-${title}-${index}`;

          return (
            <div key={key} className='track-item w-48' onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>
              {/* Image */}
              {actualTrack.album?.images && actualTrack.album.images.length > 0 && (
                <img
                  src={actualTrack.album.images[0]?.url}
                  alt={`${actualTrack.name} album art`}
                  className='track-album-image w-48 h-48 object-cover rounded-full border-6 border-b-green-500 border-t-green-600 shadow-2xl shadow-green-600 shrink-0'
                />
              )}
              {/* Details */}
              <div className='track-details'>
                <h3 className='track-name'>{actualTrack.name}</h3>
                <p className='track-artists '>
                  {actualTrack.artists?.map((artist) => artist.name).join(', ') || 'Unknown Artist'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackCard;