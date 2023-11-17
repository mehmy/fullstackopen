const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const listHelper = require('../utils/list_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = listHelper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(listHelper.initialBlogs.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs');

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain('What the hell');
  });
});

describe('all test regarding adding new blogs', () => {
  test('a blog can be added', async () => {
    const blog = {
      title: 'Noluyooo',
      author: 'Hetty',
      url: 'google.nl',
      likes: 7,
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await listHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((t) => t.title);
    expect(titles).toContain('Noluyooo');
  });

  test('blogs with title or url return 400 bad request', async () => {
    const blog = {
      author: 'pipo',
    };
    const blogURL = {
      author: 'pipo',
      url: 'google.com',
    };

    const blogTitle = {
      title: 'hey',
      author: 'pipo',
    };

    await api.post('/api/blogs').send(blog).expect(400);
    await api.post('/api/blogs').send(blogURL).expect(400);
    await api.post('/api/blogs').send(blogTitle).expect(400);
  });

  test('blogs with no likes given are returned as 0', async () => {
    const blog = {
      title: 'whatlanwhat',
      author: 'pipo',
      url: 'google.lk',
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then((res) => {
        console.log(JSON.stringify(res.body));
        expect(res.body).toHaveProperty('likes', 0);
      });
  });

  test('unique identifier is named id', async () => {
    const blogsAtEnd = await listHelper.blogsInDb();
    expect(blogsAtEnd[0].id).toBeDefined();
  });
});

describe('deleting blog items', () => {
  test('delete blog item', async () => {
    let id;
    const blog = {
      title: 'whatlanwhat',
      author: 'pipo',
      url: 'google.lk',
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then((res) => {
        console.log(res.body.id);
        id = res.body.id;
      });

    await api.delete(`/api/blogs/${id}`).expect(204);
  });
});

describe('updating an item', () => {
  test('update item', async () => {
    let id;
    const blog = {
      title: 'whatlanwhat',
      author: 'pipo',
      url: 'google.lk',
    };

    const blogNew = {
      title: 'hophop',
      author: 'eenediyo',
      url: 'google.com',
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then((res) => {
        console.log(res.body.id);
        id = res.body.id;
      });

    await api
      .put(`/api/blogs/${id}`)
      .send(blogNew)
      .then((res) => {
        expect(res.body).toHaveProperty('title', blogNew.title);
        expect(res.body).toHaveProperty('author', blogNew.author);
        expect(res.body).toHaveProperty('url', blogNew.url);
      });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
