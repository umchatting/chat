const {signup, connect, login, join_room, send_message, get_friend} = require('./fe/module');


const uid_f = 'test2';
const upw_f = 'testtest123!@';
const upw_f_c = 'testtest123!@';
const email_f = 'test@test.com';
const phone_f = '01033452345';

(async () => {
    //const loggggg = await signup(uid_f, upw_f, upw_f_c, email_f, phone_f);
    const resp = await login(uid_f, upw_f);
    connect(resp.token);
})();