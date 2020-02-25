const { forwardTo } = require('prisma-binding');

const Query = {
  typeUsers: forwardTo('db'),

  // with this query we know who is the person and we can ask for the type
  me(parent, args, ctx, info) {
    //check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  }
};

module.exports = Query;
