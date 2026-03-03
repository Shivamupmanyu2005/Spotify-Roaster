const querystring = require('querystring');
const redisClient = require('../config/redisClient');

const clientId = process.env.client_id;
const clientSecret = process.env.client_secret;
const redirectUri = process.env.redirect_uri;

const generateString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

const cookieOptions = {
    httpOnly: true,
    sameSite: 'None',
    secure: true
};

const login = async (req, res) => {
    const state = Math.random().toString(16);
    const scope = 'user-read-private user-read-email playlist-read-private user-top-read user-read-recently-played ';

    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: clientId,
                scope,
                redirect_uri: redirectUri,
                state,
                show_dialog: true
            })
    );
};

const callback = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    const sessionId = generateString();

    if (state == null) {
        return res.redirect(
            '#' +
                querystring.stringify({
                    error: 'state_mismatch'
                })
        );
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        },
        body: querystring.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri
        })
    });

    const data = await response.json();
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const expiryTime = Date.now() + data.expires_in * 1000;

    await redisClient.set(
        sessionId,
        JSON.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
            expiry_time: expiryTime,
            state
        }),
        { EX: data.expires_in }
    );

    res.cookie('sid', sessionId, cookieOptions);
    return res.redirect('http://54.81.124.153/dashboard');
};

const logout = async (req, res) => {
    const sid = req.cookies.sid;

    if (sid) {
        await redisClient.del(sid);
        res.clearCookie('sid', cookieOptions);
        return res.status(200).json({
            message: 'Logged out successfully'
        });
    }

    return res.status(400).json({
        message: 'No active session'
    });
};

module.exports = { login, callback, logout };
