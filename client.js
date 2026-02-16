const {signup, connect, login, join_room, send_message, get_friend} = require('./fe/module');





const uid = 'test';
const upw = 'testtest123!@';
const upw_c = 'testtest123!@';
const email = 'njbsandrewlee@gmail.com';
const phone = '01072684290';
/*
(async () => {
    const loggggg = await login(uid, upw);
    console.log(loggggg.token)
    connect(loggggg.token);
})();
*/

(async () => {
    const resp = await get_friend('uid', uid);
    console.log(resp);
    console.log(resp.id);
})();