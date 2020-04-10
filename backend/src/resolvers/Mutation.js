/** @format */

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
      where: { typeName: args.typeUser },
    });
    // check if the userType isn't empty
    if (!userType) {
      throw new Error('You need to select a users type');
    }
    // create de user in the DB
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          typeUser: {
            connect: {
              id: userType.id,
            },
          },
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );

    //TODO select usertype
    //TODO create new datas before create el

    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //  we set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });
    // return the user create
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // 1.- check email exist
    const user = await ctx.db.query.user({ where: { email } });

    if (!user) {
      throw new Error(`not such user found for email ${email}`);
    }
    // 2.- check de password is ok
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password');
    }
    // 3.- JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4.- Set the cookie with token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

    // 5.- Return user
    return user;
  },

  async updateMe(parent, args, ctx, info) {
    // 1.- first take a copy of the updates
    const updates = { ...args };
    //2.- remove the ID from the updates
    delete updates.id;
    //3.-  check if the same user
    const ownsUser = args.id === ctx.request.userId;

    // TODO 4.- manage de permissions and check if the user have them to modify it (!ownsUser && hasPermissions)
    if (!ownsUser) {
      throw new Error("You don't have permission to do that!");
    }
    //5.-  run the update method
    const user = await ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );

    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //  we set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });
    // return the user create
    return user;
  },

  async createUserTech(parent, args, ctx, info) {
    const userId = await ctx.request.userId;
    const { association } = args;

    if (!userId) {
      throw new Error('you must be signed in!');
    }
    if (userId !== args.userId) {
      throw new Error('this is not your user');
    }

    const userTech = await ctx.db.mutation.createUserTech(
      {
        data: {
          ...args,
          userId: {
            connect: {
              id: userId,
            },
          },
          association: {
            connect: {
              id: association,
            },
          },
        },
      },
      info
    );
    return userTech;
  },
  async updateUserTech(parent, args, ctx, info) {
    const update = { ...args };
    delete update.id;

    // 2.5 check if you have a user in the plataform
    const userId = await ctx.request.userId;
    if (!userId) {
      throw new Error('you must be signed in!');
    }
    //3.- check is you are the owner of the data
    if (userId !== args.userId) {
      throw new Error('this is not your user');
    }
    // 4.- get the sociation id
    const { association } = args;
    const updateUserTech = await ctx.db.mutation.updateUserTech(
      {
        data: {
          title: update.title,
          titleOthers: update.titleOthers,
          phoneOffice: update.phoneOffice,
          userId: {
            connect: {
              id: userId,
            },
          },
          association: {
            connect: {
              id: association,
            },
          },
        },
        where: {
          id: args.id,
        },
      },
      info
    );
    return updateUserTech;
  },
  async updateUserStudent(parent, args, ctx, info) {
    const update = { ...args };
    delete update.id;

    // 2.5 check if you have a user in the plataform
    const userId = await ctx.request.userId;
    if (!userId) {
      throw new Error('you must be signed in!');
    }
    //3.- check is you are the owner of the data
    if (userId !== args.userId) {
      throw new Error('this is not your user');
    }

    // 4.- get the sociation id
    const {
      association,
      typeDocument,
      techResponsible,
      studing,
      numberDocument,
      classSchedule,
      gender,
      birthData,
      university,
      sourceExternal,
      originCountry,
      evaluation,
      interview,
      imageDocument,
      imageUniversity,
      coupleID,
      weekendFree,
      imageProfile,
      state,
      adress,
    } = args;
    const updateUserStudent = await ctx.db.mutation.updateUserStudent(
      {
        data: {
          userId: {
            connect: {
              id: userId,
            },
          },
          association: {
            connect: {
              id: association,
            },
          },
          typeDocument,
          numberDocument,
          studing,
          classSchedule,
          gender,
          birthData,
          weekendFree,
          adress,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
    return updateUserStudent;
  },
  async createUserStudent(parent, args, ctx, info) {
    const userId = await ctx.request.userId;
    console.log('aaa' + userId);
    console.log('bbb' + args.userId);
    console.log('ccc' + args.association);
    if (!userId) {
      throw new Error('you must be signed in!');
    }
    if (userId !== args.userId) {
      throw new Error('this is not your user');
    }
    // 4.- get the sociation id
    const {
      association,
      typeDocument,
      techResponsible,
      studing,
      numberDocument,
      classSchedule,
      gender,
      birthData,
      university,
      sourceExternal,
      originCountry,
      evaluation,
      interview,
      imageDocument,
      imageUniversity,
      coupleID,
      weekendFree,
      imageProfile,
      state,
      adress,
    } = args;
    const createUserStudent = await ctx.db.mutation.createUserStudent(
      {
        data: {
          userId: {
            connect: {
              id: userId,
            },
          },
          association: {
            connect: {
              id: association,
            },
          },
          typeDocument,
          numberDocument,
          studing,
          classSchedule,
          gender,
          birthData,
          weekendFree,
          adress,
        },
      },
      info
    );
    return createUserStudent;
  },

  async updateUserGrandpa(parent, args, ctx, info) {
    const update = { ...args };
    delete update.id;

    const userId = await ctx.request.userId;

    if (!userId) {
      throw new Error('you must be signed in!');
    }
    const {
      adress,
      birthData,
      contactPerson,
      country,
      coupleID,
      evaluation,
      house,
      imageProfile,
      interview,
      gender,
      lastName,
      name,
      numberDocument,
      phone,
      province,
      secondLastName,
      techResponsible,
      typeDocument,
    } = args;

    const updateUserGrandpa = await ctx.db.mutation.updateUserGrandpa(
      {
        data: {
          adress,
          birthData,
          contactPerson,
          country: {
            connect: {
              id: country,
            },
          },
          gender,
          lastName,
          name,
          numberDocument,
          phone,
          province: {
            connect: {
              id: province,
            },
          },
          secondLastName,
          techResponsible: {
            connect: {
              id: techResponsible,
            },
          },
          typeDocument,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
    return updateUserGrandpa;
  },
  // async createUserGrandpa(parent, args, ctx, info) {},
};

module.exports = mutations;
