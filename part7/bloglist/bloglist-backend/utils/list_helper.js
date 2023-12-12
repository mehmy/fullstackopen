const _ = require('lodash/fp');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'What the hell',
    author: 'Hasan',
    url: 'google.tr',
    likes: 3,
  },
  {
    title: 'What the heaven',
    author: 'Mehmet',
    url: 'google.com',
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlogs = (blogs) =>
  blogs.reduce(
    (highestVal, blog) => (highestVal.likes > blog.likes ? highestVal : blog),
    blogs[0]
  );

const mostBlogs = (blogs) => {};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  initialBlogs,
  blogsInDb,
  usersInDb,
};
