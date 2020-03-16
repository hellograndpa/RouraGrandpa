/** @format */

const { forwardTo } = require('prisma-binding');

const Query = {
  typeUsers: forwardTo('db'),
  associations: forwardTo('db'),
  users: forwardTo('db'),
  usersConnection: forwardTo('db'),
  associations: forwardTo('db'),

  // with this query we know who is the person and we can ask for the type
  me(parent, args, ctx, info) {
    //check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  },

  async userTeches(parent, args, ctx, info) {
    //check if there is a current user ID
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('you must be signed in!');
    }
    const allTeches = await ctx.db.query.userTeches(
      { where: { userId: { id: userId } } },
      info
    );
    return allTeches;
  },
  async userStudents(parent, args, ctx, info) {
    //check if there is a current user ID
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('you must be signed in!');
    }
    const allStudents = await ctx.db.query.userStudents(
      { where: { userId: { id: userId } } },
      info
    );
    return allStudents;
  }
};

module.exports = Query;
