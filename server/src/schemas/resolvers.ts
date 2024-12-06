import { User } from '../models/index.js';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth.js';
//import jwt from 'jsonwebtoken';
//const secret = process.env.JWT_SECRET || 'yourSecretKey';

interface Context {
  user?: {
    data: {
      _id: string;
      username: string;
    };
    iat: number;
    exp: number;
  };
}

interface AddUserArgs {

  username: string;
  password: string;

}

interface SaveJobArgs {
  input: {
    jobId: string;
    content: string;
    jobTitle: string;
    datePublished: string;
    refs: { landingPage: string };
    levels: { name: string }[];
    locations: { name: string }[];
    company: { name: string };
  };
}
// interface UserArgs {
//   username: string;
// }


// const authenticate = (context: Context) => {
//   if (!context.user) {
//     throw new AuthenticationError('Not logged in');
//   }
// };

export const resolvers = {
  Query: {

    me: async (_: any, __: any, context: Context) => {

      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      try {
        const user = await User.findById(context.user.data._id).populate('sacedJobs');
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        console.error('Error in me query:', error);
        throw new Error('Failed to fetch user data');
      }
    },

  },
  Mutation: {
    login: async (_: any, { username, password }: any) => {
      const user = await User.findOne({ username });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

    //  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '2h' });
      const token = signToken(user.username, user._id);
      return { token, user };
    },
    addUser: async (_parent: any, { username, password }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password

      const user = await User.create({ username, password });

      // Sign a token with the user's information
      const token = signToken(username, user._id);

      // Return the token and the user
      return { token, user };

      // throw new AuthenticationError('Input invalid');
    },
    saveBook: async (_: any, { input }: { input: SaveJobArgs }, context: Context) => {
      // console.log("context: ", context);

    
      if (!context.user || !context.user.data) {
        throw new AuthenticationError("Not logged in");
      }
    
   //   const userId = context.user.data._id;

    

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user.data._id,
          {
            $push: { savedJobs: input }, // Push the full Book object
          },
          { new: true } // Return the updated user
        ).populate("savedJobs");
    
        if (!updatedUser) {
          throw new Error("User update failed or user not found");
        }

        return updatedUser;
      } catch (err) {
        console.error("Error in saveBook resolver:", err);
        throw new Error("Failed to save job");
      }
    },
    removeBook: async (_: any, { jobId }: any, context: Context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user.data._id,
          { $pull: { savedJobs: { jobId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};



export default resolvers;