const { analyzeTracks } = require('../utils/analyzeTracks')
const {generateRoast} = require('../services/genaiService') 

 const roastProfile = async(req,res) => {
    const access_token = req.spotifyToken;
    let analyzedProfile;

    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',{
            method: 'GET',
             headers: {
                'Authorization': 'Bearer ' + access_token
            }

        })
        if(!response.ok) {
           return res.status(500).json({
                message: 'Failed to fetch top tracks'
            })
            
        }


        const topTracks = await response.json();
        

        const response2 = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50' , {
             method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })

        if(!response2.ok) {
           return res.status(500).json({
                message: 'Failed to fetch recently played tracks'
            })
            
        }

        const recentTracks = await response2.json();


       analyzedProfile =  analyzeTracks(topTracks,recentTracks);

       const profile = analyzedProfile;

       let roast = await generateRoast(profile);

       res.status(200).json({
        roastprofile: analyzedProfile,
        roastText: roast,
        Profile: profile 
       })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error fetching data'
        })
        
        
    }
}

module.exports = {roastProfile}