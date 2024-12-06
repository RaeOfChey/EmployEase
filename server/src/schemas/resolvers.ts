import { User } from '../models/index.js';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth.js';

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

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      try {
        const user = await User.findById(context.user.data._id).populate('savedJobs');
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

      const token = signToken(user.username, user._id);
      return { token, user };
    },
    addUser: async (_: any, { username, password }: AddUserArgs) => {
      const user = await User.create({ username, password });
      const token = signToken(username, user._id);
      return { token, user };
    },
    saveJob: async (_: any, { input }: { input: SaveJobArgs }, context: Context) => {
      if (!context.user || !context.user.data) {
        throw new AuthenticationError('Not logged in');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user.data._id,
          {
            $push: { savedJobs: input },
          },
          { new: true }
        ).populate('savedJobs');

        if (!updatedUser) {
          throw new Error('User update failed or user not found');
        }

        return updatedUser;
      } catch (err) {
        console.error('Error in saveJob resolver:', err);
        throw new Error('Failed to save job');
      }
    },
    removeJob: async (_: any, { jobId }: any, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user.data._id,
          {
            $pull: { savedJobs: { jobId } },
          },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error('User not found');
        }

        return updatedUser;
      } catch (err) {
        console.error('Error in removeJob resolver:', err);
        throw new Error('Failed to remove job');
      }
    },
  },
};

export default resolvers;