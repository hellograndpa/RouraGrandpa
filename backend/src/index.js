const cookieParser = require('cookie-parser');

require('dotenv').config({ path: 'variables.env' });

const createServer = require('./createServer');
const db = require('./db');
const server = createServer();

server.express.use(cookieParser());

//TODO use express middlware to populate current user -- (user ME)

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is running on port http:/localhost:${deets.port}`);
  }
);
