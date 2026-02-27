const express = require('express');
const router = express.Router();

const {protect} = require('../middlewares/requireSpotifyAuth');

const spotifyController = require('../controllers/spotifyController');

router.get('/me',protect, spotifyController.getMe);

router.get('/top-tracks',protect, spotifyController.getTopTracks);

router.get('/recently-played',protect, spotifyController.getRecentlyPlayed);

module.exports = router;