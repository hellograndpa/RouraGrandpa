const { forwardTo } = require('prisma-binding');

const Query = {
  typeUsers: forwardTo('db'),
  // async typeUsers(parent, args, ctx, info) {
  //   const typeUser = await ctx.db.query.typeUser();
  //   return typeUser;
  // },
};

module.exports = Query;
