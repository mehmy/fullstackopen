import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      console.log(window.localStorage.getItem('loggedBlogAppUser'));
      console.log(user.token);
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotifMessage(`${user.name} logged in successfully`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Username or password incorrect');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      const blog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      });

      setBlogs([...blogs, { ...blog }]);
      setNotifMessage(`a new blog ${blog.title} by ${blog.author} added!`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
    } catch (exception) {
      setErrorMessage('issue with creating a post');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogForm = () => (
    <form onSubmit={createBlog}>
      <div>
        title
        <input
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h2>Blogs</h2>
      {notifMessage !== '' && <Notification message={notifMessage} />}
      {errorMessage !== '' && <ErrorMessage message={errorMessage} />}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} is logged in{' '}
          <button onClick={() => handleLogout()}>Logout</button>
          <h2>create new</h2>
          {blogForm()}
        </div>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
