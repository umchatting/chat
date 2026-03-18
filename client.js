const dotenv = require('dotenv').config({path: './.env'});
const {signup, connect, login, join_room, send_message, get_friend, leave_room} = require('./fe/module');

const uid = 'test';
const upw = 'testtest123!@';
const upw_c = 'testtest123!@';
const email = 'njbsandrewlee@gmail.com';
const phone = '01072684290';

/*
(async () => {
    const resp = await get_friend('uid', uid);
    console.log(resp);
    console.log(resp.id);
})();

(async () => {
    let resp = await signup(uid, upw, upw_c, email, phone);
    console.log(resp);

})();*/


(async () => {
    const resp = await login(uid, upw);
    if (!resp || !resp.ok) {
        console.error(resp);
        return;
    }

    await connect(resp.token);
    console.log(resp.token)

    const friend = await get_friend('uid', 'test2'); //if friend not exist?
    const roomId = await join_room(friend.id);
    const sent = await send_message({ 
        roomId: `${roomId}`, 
        content: 'test'
    });
    console.log(sent);
    leave_room(roomId);
})();

//test test
//test