const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
    Query: {
        getPosts: async (_, args, {Post}) => {
            const posts = await Post.find().sort({createdDate: 'desc'}).populate({
                path: 'createdBy',
                model: 'User'
            });
            return posts;
        }
    },
    Mutation: {
        addPost: async (
            _,
            {title, imageUrl, categories, description, creatorId},
            {Post}
        ) => {
            const newPost = await new Post({
                title,
                imageUrl,
                categories,
                description,
                createdBy: creatorId
            }).save();
            return newPost;
        },
        loginUser: async (_, { email, password }, { User }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const isValidPassowrd = await bcrypt.compare(password, user.password);

            if(!isValidPassowrd){
                throw new Error('Wrong Password');
            }
            return { token: createToken(user, process.env.JWT_SALT, '1hr')};
        },
        registerUser: async (_, {username, email, password}, {User}) => {
            const user = await User.findOne({username});
            if (user) {
                throw new Error("User already exists");
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return { token: createToken(newUser, process.env.JWT_SALT, '1hr')};
        }
    }
};
