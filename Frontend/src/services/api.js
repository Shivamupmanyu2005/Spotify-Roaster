import url from "../utils.js";

const checkauth =  async() => {
    try {
        const response = await fetch(`${url}/spotify/me`,{
            credentials:'include',
            method: 'GET'
        })

        if(!response.ok){
            throw new Error('Failed to fetch profile');

        }

          const profile = await response.json();

        return profile;
        
    } catch (error) {
        throw error;
        
    }
} 

const getTopTracks =  async() => {
    try {
        const response = await fetch(`${url}/spotify/top-tracks`,{
            credentials:'include',
            method: 'GET'
        })

        if(!response.ok){
            throw new Error('Failed to fetch Top Tracks');

        }

          const tracks = await response.json();

        return tracks;
        
    } catch (error) {
        throw error;
        
    }
} 
const getRecentTracks =  async() => {
    try {
        const response = await fetch(`${url}/spotify/recently-played`,{
            credentials:'include',
            method: 'GET'
        })

        if(!response.ok){
            throw new Error('Failed to fetch Recent Tracks');

        }

          const recentTracks = await response.json();

        return recentTracks;
        
    } catch (error) {
        throw error;
        
    }
} 
const generateRoast =  async() => {
    try {
        const response = await fetch(`${url}/api/roast`,{
            credentials:'include',
            method: 'POST'
        })

        if(!response.ok){
            throw new Error('Failed to generate Roast');

        }

          const roast = await response.json();

        return roast;
        
    } catch (error) {
        throw error;
        
    }
} 

const logoutUser = async() => {
    try {
        const response = await fetch(`${url}/logout`, {
            credentials: 'include',
            method: 'GET'
        });

        if(!response.ok) {
             throw new Error('Failed to logout');
        }
        return await response.json();
    } catch (error) {
        console.error("Logout API error:", error);
        throw error;
        
    }
}

export {checkauth, getTopTracks, getRecentTracks, generateRoast,logoutUser};