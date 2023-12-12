import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import ErrorMessage from './components/ErrorMessage';
import LoginForm from './components/Loginform';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [notifMessage]);

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
    setUser(null);
  };

  const createBlog = async (blogObject) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create(blogObject);

      setBlogs([...blogs, { ...blog }]);
      setNotifMessage(`a new blog ${blog.title} by ${blog.author} added!`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('issue with creating a post');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      {notifMessage !== '' && <Notification message={notifMessage} />}
      {errorMessage !== '' && <ErrorMessage message={errorMessage} />}
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={() => handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <div>
          {user.name} is logged in{' '}
          <button onClick={() => handleLogout()}>Logout</button>
          <h2>create new</h2>
          <Togglable buttonLabel="blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      {}
      {console.log(blogs.sort((a, b) => b.likes - a.likes))}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setErrorMessage={setErrorMessage}
          setNotifMessage={setNotifMessage}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
