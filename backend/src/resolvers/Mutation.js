const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
  async signup(parent, args, ctx, info) {
    // email all write in lowCase
    args.email = args.email.toLowerCase();
    // Hash their password
    const password = await bcrypt.hash(args.password, 10);
    // query look for de id of typeUser
    const userType = await ctx.db.query.typeUser({
      where: { typeName: args.typeUser }
    });
    console.log('uno que va' + args.typeUser);
    console.log('uno que va' + userType.id);

    // create de user in the DB
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          typeUser: {
            connect: {
              id: userType.id
            }
          },
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //  we set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    // return the user create
    return user;
  }
};

module.exports = mutations;
