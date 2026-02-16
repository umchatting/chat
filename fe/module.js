const { io } = require('socket.io-client');
const axios = require('axios');
const socket = io('http://localhost:3000', {
    autoConnect: false
});
const serverUrl = "http://localhost:3000"


async function connect(token) {
    socket.auth = { token } ;
    socket.connect();
};

async function signup(uid, upw, upw_c, email, phone) {
    const signupUrl = serverUrl + '/auth/signup'
    try {
        const res = await axios.post(signupUrl, {
            uid: `${uid}`,
            upw: `${upw}`,
            upw_c: `${upw_c}`,
            email: `${email}`,
            phone: `${phone}`
        });
        return res.data;   

    } catch (err) {
        return err.response.data;
    };
};

async function login(uid, upw) {
    const loginUrl = serverUrl + '/auth/login';
    //console.log(loginUrl)
    try {
        const res = await axios.post(loginUrl, {
            uid: `${uid}`,
            upw: `${upw}`
        });

        return res.data
    } catch (err) {
        return err.response.data;
    }
};

// ===============BE code==============//
/*
async function join_room(from, to) {
    socket.emit('join_room', {from, to}, async (res) => {
        if (res.ok) {
            openRoomUi();
            let roomId = await res.roomId;
            console.log('roomId: ', roomId)
            return roomId;
        } else{
            console.error('join_room: ', res.error);
        };
    });
};
*/
async function join_room(to) {
    return new Promise((resolve, reject) => {
        socket.emit('join_room', { to }, (res) => {
            if (res.ok) {
                resolve(res); // 여기서 실제 roomId 반환
            } else {
                console.error('join_room: ', res.error);
                reject(res);
            }
        });
    });
};

async function send_message(msg) {
    socket.emit('send_message', msg, (res) => {
        if (res.ok) {
            console.log('send_message: ', msg);
        } else {
            addMessageToUi({ ...msg, status:'failed'});
        };
    });
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
            return res.data;
        } else {
            return { ok: false };
        };
    } catch (err) {
        return err.response.data;
    };
}


module.exports = {signup, connect, login, join_room, send_message, get_friend};