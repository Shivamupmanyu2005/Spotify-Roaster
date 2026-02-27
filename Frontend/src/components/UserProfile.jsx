import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { forwardRef } from 'react'
import { logoutUser } from '../services/api'
import gsap from 'gsap'



const UserProfile = forwardRef(({user},ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async() => {
    
    await logoutUser();
    dispatch(logout())
    navigate('/')
  }



  let displayName = user.data?.display_name || "Guest"
  let profileImage = user.data?.images?.[0]?.url
  const externalUrl = user.data?.external_urls?.spotify

  useEffect(() => {

    const tl = gsap.timeline();




    gsap.fromTo(".profile-welcome",{
      filter: 'blur(10px)', 
      
      opacity: 0, 
      
      x: -20,

      scale: 2
    
    },
    
    {
         filter: "blur(0px)", x:0,
         opacity: 1, duration: 2.2, ease: "power2.out", scale: 1
      },)

    gsap.fromTo(".view-spotify",{
      filter: 'blur(10px)', 
      
      opacity: 0, 
      
      x: -20,

      scale: 2
    
    },
    
    {
         filter: "blur(0px)", x:0,
         opacity: 1, duration: 2.2, ease: "power2.out", scale: 1
      })


    gsap.fromTo(".logout-button",{
      filter: 'blur(10px)', 
      
      opacity: 0, 
      
      x: -20,

      scale: 2
    
    },
    
    {
         filter: "blur(0px)", x:0,
         opacity: 1, duration: 2.2, ease: "power2.out", scale: 1
      })



  },[])
  return (
    <div ref={ref} className='user-profile-card  flex flex-col items-center align-middle gap-4 p-8 font-bold font-display  text-white text-sm '>
      {profileImage && 
      <img src= {profileImage} alt= {`${displayName}'s Profile`} className='user-profile-image rounded-4xl border-2 border-red-500 shadow-2xl shadow-red-600' srcset="" />}
      <h2 className='profile-welcome'>Welcome {`${displayName}`}</h2>
      {externalUrl && 
      <p className='view-spotify'>
        <a href={externalUrl} target='_blank' rel='noopener noreferrer' >
        View on Spotify
        </a>
        </p>}

        <button
        onClick={handlelogout}
        className='logout-button bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4'
        >
        Logout

        </button>

    
    </div>
  )
})

export default UserProfile