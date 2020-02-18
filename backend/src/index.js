require('dotenv').config({ path: 'variables.env' });

const createServer = require('./createServer');
const db = require('./db');
const server = createServer();

//TODO use express middlware to handle cookies (JWT) we need to see if we want to recover password from student
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
