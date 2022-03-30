import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User");
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, _id) => await User.findOne(_id),
  },

  Mutation: {
    createUser: async (_, { newUser }) => {
      const user = await User.findOne({ email: newUser.email });
      if (user) {
        throw new Error("User Already Exists with that email");
      }

      const hashPassword = await bcryptjs.hash(newUser.password, 12);

      const userNew = new User({
        ...newUser,
        password: hashPassword,
      });

      return await userNew.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });

      if (!user) {
        throw new Error("User dosent exists with that email");
      }

      const doMatch = await bcryptjs.compare(
        userSignin.password,
        user.password
      );

      if (!doMatch) {
        throw new Error("Email or Password is Invalid");
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      return { token };
    },

    deleteUser: async (_, { userid }) => {
      return User.findByIdAndDelete({ _id: userid });
    },

    updateUser: async (parent, args) => {
      const filter = { _id: args.userUpdate.userid };

      const update = {
        firstName: args.userUpdate.firstName,
        lastName: args.userUpdate.lastName,
        email: args.userUpdate.email,
        mobile: args.userUpdate.mobile,
        city: args.userUpdate.city,
        state: args.userUpdate.state,
        story: args.userUpdate.story,
      };

      return await User.findOneAndUpdate(filter, update, { new: true });
    },
  },
};

export default resolvers;
