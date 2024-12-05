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
      email: string;
    };
    iat: number;
    exp: number;
  };
}

interface AddUserArgs {

  username: string;
  email: string;
  password: string;

}

interface SaveBookArgs {
  input: {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
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
        const user = await User.findById(context.user.data._id).populate('savedBooks');
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
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

    //  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '2h' });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addUser: async (_parent: any, { username, email, password }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password

      const user = await User.create({ username, email, password });

      // Sign a token with the user's information
      const token = signToken(username, email, user._id);

      // Return the token and the user
      return { token, user };

      // throw new AuthenticationError('Input invalid');
    },
    saveBook: async (_: any, { input }: { input: SaveBookArgs }, context: Context) => {
      // console.log("context: ", context);

    
      if (!context.user || !context.user.data) {
        throw new AuthenticationError("Not logged in");
      }
    
   //   const userId = context.user.data._id;

    

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user.data._id,
          {
            $push: { savedBooks: input }, // Push the full Book object
          },
          { new: true } // Return the updated user
        ).populate("savedBooks");
    
        if (!updatedUser) {
          throw new Error("User update failed or user not found");
        }

        return updatedUser;
      } catch (err) {
        console.error("Error in saveBook resolver:", err);
        throw new Error("Failed to save book");
      }
    },
    removeBook: async (_: any, { bookId }: any, context: Context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user.data._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};



export default resolvers;