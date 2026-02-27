 const getMe = async (req, res) => {
    try {
        const access_token = req.spotifyToken;

        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }

        })
       
        if (!response.ok) {
            const text = await response.text();
          return  res.status(response.status).json({
                message: "Failed to fetch user profile",
                details: text
            })

            
            
        }

         const profile = await response.json();

        res.status(200).json({
            data: profile
        })





    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: 'Error fetching user profile'
        })


    }
}

 const getTopTracks = async (req, res) => {
    try {
        const access_token = req.spotifyToken;

        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }

        })

        
        if (!response.ok) {
            const text = await response.text();
           return  res.status(response.status).json({
                message: "Failed to fetch top tracks",
                details: text
            })
           
        }
        const toptracks = await response.json();

        res.status(200).json({
            data: toptracks
        })

          
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Error fetching top tracks'
        })

        

    }
}

 const getRecentlyPlayed = async(req,res) => {
    try {
        const access_token = req.spotifyToken;

        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }

        })

        
        if(!response.ok) {
            const text = await response.text();
           return res.status(response.status).json({
                message: 'Failed to fetch recently played tracks',
                details:text
            })
            
        }
        const recentlyPlayed = await response.json();

        res.status(200).json({
            data: recentlyPlayed
        })

      
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error fetching recently played tracks'
        })
        
    }
}


module.exports = {getMe, getRecentlyPlayed , getTopTracks}



