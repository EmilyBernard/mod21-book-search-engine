const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        users: async (parent, { _id }) => {
           const params = _id ? { _id } : {};
           return User.find({params});
        },
      },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        },
        addBook: async (parent, { input }, context) => {
            if (context.user) {
                const addedBook = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true }
              );
              return addedBook;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const removedBook = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $pull: { savedBooks: { bookId: bookId } },
                },
                { new: true }
              );
              return removedBook;

            }
            throw new AuthenticationError('You need to be logged in!');
          },
        };

module.exports = resolvers;