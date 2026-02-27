
const redisClient = require('../config/redisClient');
const protect = async(req, res, next) => {
  try {

    let sid = req.cookies.sid
    
    
    

    if(!sid){
      return res.status(401).json({
        message: 'User is not logged In'
      })
    }

    const sessionData = await redisClient.get(sid);
    
    if(!sessionData) {
      return res.status(401).json({
        message: 'Session expired'
      })
    }
    let tokens = JSON.parse(sessionData);

    if(Date.now() > tokens.expiry_time) {
      return res.status(401).json({
        message:"Token Expired!"
      })
    }

    
    req.spotifyToken = tokens.access_token;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'Error verifying Spotify access token'
    });
  }
};

module.exports = { protect };
