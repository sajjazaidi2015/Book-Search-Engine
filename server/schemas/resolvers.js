// const { User } = require('../models');

// const resolvers = {
//   Query: {
//     users: async () => {
//       return await User.find({});
//     }
//   },
//   Mutation: {
    // createUser: async (parent, {username, email, password}) => {
    //     const user = await User.create({username, email, password})
    //     return user;
//     }
//   }
// };

// module.exports = resolvers;
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("savedBooks");
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const addBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            savedBooks: {
                                bookId: args.bookId,
                                description: args.description,
                                title: args.title,
                                image: args.image,
                                authors: args.authors,
                            }
                        },
                    },
                    {new: true},   
                );
                return addBook;
            }
            throw new AuthenticationError ('User not found');
        },

        deleteBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(
                    { _id: userId },
                    {
                        $pull: {
                            savedBooks: {
                                _id: bookId,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
