const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = request.body;

  if (!blog.title || !blog.url) {
    response.status(400).json(blog);
  } else {
    const user = await User.findById(blog.userId);
    console.log(user);

    // const newBlog = new Blog({
    //   title: blog.title,
    //   author: blog.author,
    //   url: blog.url,
    //   likes: blog.likes,
    //   userId: user.id,
    // });

    // const savedBlog = newBlog.save();
    // user.blogs = user.blogs.concat(savedBlog._id);
    // await newBlog.save();
    // response.status(201).json(savedBlog);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id).then((result) => {
    response.status(204).end();
  });
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }).then(
    (updatedBlog) => {
      response.json(updatedBlog);
    }
  );
});
module.exports = blogsRouter;
