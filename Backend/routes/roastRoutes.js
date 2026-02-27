const express = require('express');
const router = express.Router();

const { roastProfile } = require('../controllers/roastController');
const { protect } = require('../middlewares/requireSpotifyAuth');


router.post('/roast',protect, roastProfile);

module.exports = router;