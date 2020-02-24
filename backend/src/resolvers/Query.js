const { forwardTo } = require('prisma-binding');

const Query = {
  // this is old way to do it.
  // async typeUsers(parent, args, ctx, info) {
  //   const typeUser = await ctx.db.query.typeUser();
  //   return typeUser;
  // }
  typeUsers: forwardTo('db')
};

module.exports = Query;
