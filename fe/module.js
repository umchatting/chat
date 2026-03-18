const { io } = require('socket.io-client');
const axios = require('axios');
const { isPassportNumber } = require('validator');
const dotenv  = require('dotenv').config({path: '../.env'})
const socket = io(process.env.SERVER_URL, {
    autoConnect: false
});
const serverUrl = process.env.SERVER_URL;

async function connect(token) {
    socket.auth = { token } ;
    socket.connect();
};

async function signup(uid, upw, upw_c, email, phone) {
    const signUpUrl = serverUrl + '/auth/signup';

    try{ 
        const res = await axios.post(signUpUrl, {
            uid: `${uid}`,
            upw: `${upw}`,
            upw_c: `${upw_c}`,
            email: `${email}`,
            phone: `${phone}`
        });
        console.log(res)
    } catch (err) {
        console.log(err.status);
        return(err.status);
    };  

    /* anti-pattern
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(signupUrl, {
                uid: `${uid}`,
                upw: `${upw}`,
                upw_c: `${upw_c}`,
                email: `${email}`,
                phone: `${phone}`
            });
            resolve(res.data);   

        } catch (err) {
            reject(err.response.data);
        };
    });
    */
};

async function login(uid, upw) {
    const loginUrl = serverUrl + '/auth/login';

        try {
            const res = await axios.post(loginUrl, {
                uid: `${uid}`,
                upw: `${upw}`
            });
            return(res.data);
        } catch (err) {
            //console.log(err);
            return(err.response?.data || err.message);
        };


    //console.log(loginUrl)

    /* anti-pattern
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(loginUrl, {
                uid: `${uid}`,
                upw: `${upw}`
            });
            resolve(res.data);
        } catch (err) {
            //console.log(err);
            reject(err.response?.data || err.message);
        };
    }).catch((error) => {
        return error;
    });
    */
};

//=========functions related to Modules==========//
async function join_room(to) {
    
    return new Promise(async (resolve, reject) => {
        socket.emit('join_room', { to }, (res) => {
            if (res.ok) {
                console.log('join_room: ', res.roomId)
                resolve(res.roomId); // 여기서 실제 roomId 반환 
            } else {
                console.error('join_room: ', res.error);
                reject(res.error);
            }
        });
    });
    
};

async function send_message(msg) {
    console.log('sending messages: ', msg);
    socket.emit('send_message', msg, (res) => {
        if (res.ok) {
            console.log('send_message: ', msg);
            return(res);
        } else {
            console.log('send_message failed ', msg)
            return(res);
        };
        }); 
    /*anti-pattern
    return new Promise(async (resolve, reject) => {
        socket.emit('send_message', msg, (res) => {
            if (res.ok) {
                console.log('send_message: ', msg);
                resolve(res);
            } else {
                console.log('send_message failed ', msg)
                reject(res);
            };
        }); 
    });
    */
}; 

async function get_friend(type, input) {
    const getFriendUrl = serverUrl + '/auth/friend';
    //console.log(getFriendUrl);
    try {
        const res = await axios.post(getFriendUrl, {
            type: `${type}`,
            data: `${input}`
        });

        if (res.data.ok) {
            return(res.data);
        } else {
            return({ ok: false });
        };
    } catch (err) {
        return(err.response.data);
    };

    /* anti-pattern
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(getFriendUrl, {
                type: `${type}`,
                data: `${input}`
            });
            if (res.data.ok) {
                resolve(res.data);
            } else {
                reject({ ok: false });
            };
        } catch (err) {
            reject(err.response.data);
        };
    });
    */ 
};

async function leave_room(roomId) {
    socket.emit('leave_room', { roomId:  `${roomId}`});
    console.log('left room: ', roomId);
};


// testing edit
module.exports = {signup, connect, login, join_room, send_message, get_friend, leave_room};