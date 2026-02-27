const querystring = require('querystring')
const redisClient = require('../config/redisClient')

let client_id = process.env.client_id;
let client_secret = process.env.client_secret;
let redirect_uri = 'http://127.0.0.1:3000/callback';

const generateString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for(let i = 0; i < 10 ; i++) {

        result += characters.charAt(Math.floor(Math.random() * characters.length));

    }
    return result;
}




 const login = async(req,res) => {
    let state = Math.random().toString(16);
    let scope = 'user-read-private user-read-email playlist-read-private user-top-read user-read-recently-played ';

    res.redirect('https://accounts.spotify.com/authorize?' + 
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope,
            redirect_uri: redirect_uri,
            state: state,
            show_dialog: true

        })

    )
}


 const callback = async(req,res) => {
    let code = req.query.code;
    let state = req.query.state;
    let session_id = generateString();

    if(state == null) {
        res.redirect('#' + querystring.stringify({
            error: 'state_mismatch'
        }))
    } else {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            body: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri
            })

        


            

            
        })

        const data = await response.json();
        let access_token = data.access_token;
        let refresh_token = data.refresh_token;
        let expiry_time = Date.now() + (data.expires_in * 1000);
        
        await redisClient.set(session_id, JSON.stringify({
            access_token, refresh_token, expiry_time,state
        }), {EX : data.expires_in})

        res.cookie('sid', session_id, {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false
    });

     res.redirect('http://127.0.0.1:5173/dashboard');
        
    }

   
}

const logout = async(req,res) => {
    let sid = req.cookies.sid;

    if(sid) {
        await redisClient.del(sid);
        res.clearCookie('sid',{
            httpOnly: true,
            sameSite: 'Lax',
            secure: false
        });
        return res.status(200).json({
            message: 'Logged out successfully'
        });
    }
    res.status(400).json({
        message: 'No active session'
    });

}


module.exports = {login, callback, logout}
