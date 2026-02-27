
// const express = require('express');
// const querystring = require('querystring')

// require('dotenv').config();

// const app = express();

// let client_id = process.env.client_id;
// let redirect_uri = 'http://127.0.0.1:3000/callback';
// let port = process.env.PORT;
// let client_secret = process.env.client_secret;

// app.get('/login', (req, res) => {

//     let state = Math.random().toString(16);
//     let scope = 'user-read-private user-read-email playlist-read-private';

//     res.redirect('https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//             response_type: 'code',
//             client_id: client_id,
//             scope,
//             redirect_uri: redirect_uri,
//             state: state

//         })
//     )
// })

// app.get('/callback', async (req, res) => {
//     let code = req.query.code;
//     let state = req.query.state;

//     if (state == null) {
//         res.redirect('#' + querystring.stringify({
//             error: 'state_mismatch'
//         }))
//     } else {

//         await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//             },
//             body: querystring.stringify({
//                 grant_type: 'authorization_code',
//                 code: code,
//                 redirect_uri: redirect_uri
//             })

//         }).then((res) => {
//             data = res.json();


//             return data;

//         }).then( async(data) => {
//             let access_token  = data.access_token;
//             let refresh_token = data.refresh_token;

//             await fetch('https://api.spotify.com/v1/me/playlists', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': 'Bearer ' + access_token
//                 }
//             }).then(async(res) => {
//                 let user_data = await res.json();
//                 let spotify_user_id = user_data.items[0].id;
//                 console.log(spotify_user_id);



//                 await fetch(`https://api.spotify.com/v1/playlists/${spotify_user_id}/tracks`, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': 'Bearer ' + access_token
//                     }

//                 }).then(async(res) => {
//                     let user_tracks = await res.json();
//                     console.log(user_tracks);
//                 })



//             })

//             res.send('User_Data Fetched Successfully. Please check your console.');


//         }) 


//     }

// })

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);

// })


require('dotenv').config();

const express = require('express');
const cors = require('cors');

let cookieParser = require('cookie-parser')




const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
}));



app.set("trust proxy", 1)




app.use(cookieParser());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
const roastRoutes = require('./routes/roastRoutes')



app.use('/', authRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/api',roastRoutes);

app.listen(PORT, () => {
    console.log(`Server is running  on ${PORT}`);

})