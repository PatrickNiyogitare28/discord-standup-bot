import {config} from 'dotenv';
config();
const server = require('./app');

const PORT = process.env.PORT;
server.listen(PORT, () => console.log("Bot server ππΏππΏππΏ on "+PORT));
