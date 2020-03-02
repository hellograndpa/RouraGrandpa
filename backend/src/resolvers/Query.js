const { forwardTo } = require('prisma-binding');

const Query = {
  typeUsers: forwardTo('db')
};

module.exports = Query;
