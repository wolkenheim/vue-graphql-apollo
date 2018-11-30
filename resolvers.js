const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find().sort({ createdDate: 'desc' }).populate({
        path: 'userId',
        model: 'User'
      });
      return posts;
    },
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ email: currentUser.email }).populate({
        path: 'favorites',
        model: 'Post'
      })
      return user;
    },
    infiniteScrollPosts: async (_, { pageNum, pageSize }, { Post }) => {
      let posts;
      if (pageNum === 1) {
        posts = await Post.find({})
          .sort({ createdDate: "desc" })
          .populate({
            path: "userId",
            model: "User"
          })
          .limit(pageSize);
      } else {
        // If page number is greater than one, figure out how many documents to skip
        const skips = pageSize * (pageNum - 1);
        posts = await Post.find({})
          .sort({ createdDate: "desc" })
          .populate({
            path: "userId",
            model: "User"
          })
          .skip(skips)
          .limit(pageSize);
      }
      const totalDocs = await Post.countDocuments();
      const hasMore = totalDocs > pageSize * pageNum;
      return { posts, hasMore };
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, userId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        userId,
      }).save();
      return newPost;
    },
    loginUser: async (_, { email, password }, { User }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassowrd = await bcrypt.compare(password, user.password);

      if (!isValidPassowrd) {
        throw new Error('Wrong Password');
      }
      return { token: createToken(user, process.env.JWT_SALT, '1hr') };
    },
    registerUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.JWT_SALT, '1hr') };
    }
  }
};
