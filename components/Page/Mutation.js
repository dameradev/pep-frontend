const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { hasPermission } = require("../utils");

const Mutations = {
  async createProject(parent, args, ctx, info) {
    //TODO: CHECK IF USER IS LOGGED IN
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    console.log(args, "pederce");

    const project = await ctx.db.mutation.createProject(
      {
        data: {
          ...args,
          // title: args.title,

          user: {
            connect: {
              id: ctx.request.userId
            }
          },

          nations: { create: args.nations },
          // {create: }}
          location: { create: args.location }
          // objectives: { set: args.objectives },
          // countries: { set: args.countries }
        }
      },
      info
    );
    // console.log(args.location.position, "HERE")
    console.log(project, "here");
    return project;
  },

  async createNation(parent, args, ctx, info) {
    const nation = await ctx.db.mutation.createNation(
      {
        data: {
          ...args
        }
      },
      info
    );
  },

  async createCountry(parent, args, ctx, info) {
    console.log("here motherfucker");
    const country = await ctx.db.mutation.createCountry(
      { data: { ...args } },
      info
    );
    return country;
  },

  async signup(parent, args, ctx, info) {
    if (!args.email || !args.password) {
      throw new Error("Please provide password and email");
    }

    const email = args.email.toLowerCase();

    // Hash the password
    const password = await bcrypt.hash(args.password, 12);
    // console.log(type);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          email,
          password,

          permissions: { set: ["USER"] }
        }
      },
      info
    );

    const token = JWT.sign({ userId: user.Id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },

  async signin(parent, args, ctx, info) {
    if (!args.email || !args.password) {
      throw new Error("Please provide password and email");
    }

    // Check if user exists
    const user = await ctx.db.query.user({ where: { email: args.email } });

    // console.log(user, "pedecere");

    if (!user) {
      throw new Error("User with that email doesn't exist");
    }

    //  Check if password matches
    // console.log(args.password, user);
    const passwordMatch = await bcrypt.compare(args.password, user.password);

    if (!passwordMatch) {
      throw new Error("Password does not match!");
    }

    const token = JWT.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { successMessage: "Goodbye!" };
  },

  async updatePermission(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    const userToUpdate = await ctx.db.query.user(
      { where: { id: args.userId } },
      info
    );

    hasPermission(currentUser, ["ADMIN"]);

    ctx.db.mutation.updateUser(
      {
        where: { id: args.userId },
        data: {
          permissions: { set: args.permissions }
        }
      },
      info
    );
  },

  async applyForProject(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that");
    }

    const currentUser = await ctx.db.query.user({
      where: { id: ctx.request.userId }
    });

    console.log(currentUser);

    const nations = await ctx.db.query.nations({
      where: { project: { id: args.projectId } }
    });

    const nation = nations.find(
      nation =>
        nation.name.toLowerCase() === currentUser.nationality.toLowerCase()
    );

    const canApply = nation && true;

    console.log(currentUser);

    // return {
    //   success: true
    // };
    if (canApply) {
      const applicant = await ctx.db.mutation.createApplicant(
        {
          data: {
            motivation: args.motivation,
            reason: args.reason,
            afterProject: args.afterProject,
            foodPreference: { set: args.foodPreference },
            status: "PENDING",
            applicant: {
              connect: {
                id: ctx.request.userId
              }
            },
            project: {
              connect: {
                id: args.projectId
              }
            }
          }
        },
        info
      );
      return applicant;
    }
  },

  async updateOrganization(parent, args, ctx, info) {
    // if (!args.userId) {
    //   throw new Error("You must be logged in to do that");
    // }

    const user = await ctx.db.mutation.updateUser(
      {
        where: { id: args.id },
        data: {
          name: args.name,
          slogan: args.slogan,
          summary: args.summary,
          responsiblePerson: args.responsiblePerson,
          phoneNumber: args.phoneNumber,
          website: args.website,
          focusedOn: { set: args.focusedOn }
        }
      },
      info
    );

    console.log(user, "dame");
    return user;
  },

  async changeApplicantStatus(parent, args, ctx, info) {
    if (!args.userId) {
      throw new Error("You must be logged in to do that");
    }

    const userToUpdate = await ctx.db.query.user(
      {
        where: { id: args.userId }
      },
      info
    );

    const applicant = await ctx.db.query.applicant({
      where: { id: args.applicantId }
    });

    const nation = await ctx.db.query.nations({
      where: {
        name: userToUpdate.nationality.toLowerCase(),
        project: { id: args.projectId }
      }
    });
    if (args.status === "ACCEPTED") {
      await ctx.db.mutation.updateProject({
        where: { id: args.projectId },
        data: {
          participants: {
            connect: [{ id: args.userId }]
          }
        }
      });

      await ctx.db.mutation.updateNation({
        where: {
          id: nation[0].id
        },
        data: {
          numberOfParticipants: nation[0].numberOfParticipants - 1
        }
      });
    } else if (args.status === "REJECTED") {
      if (applicant.status === "ACCEPTED") {
        await ctx.db.mutation.updateNation({
          where: {
            id: nation[0].id
          },
          data: {
            numberOfParticipants: nation[0].numberOfParticipants + 1
          }
        });
      }

      await ctx.db.mutation.updateUser({
        where: { id: args.userId },
        data: {
          projectsParticipating: {
            disconnect: [{ id: args.projectId }]
          }
        }
      });
    }

    return await ctx.db.mutation.updateApplicant({
      where: { id: args.applicantId },
      data: { status: args.status }
    });
  }
};

module.exports = Mutations;
