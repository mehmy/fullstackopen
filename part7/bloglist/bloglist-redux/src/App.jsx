import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/Loginform';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useSelector } from 'react-redux';
import { setNotiTimeOut } from './reducers/notificationReducer.js';
import { setErrorTimeOut } from './reducers/errorReducer.js';
import store from './store.js';
import { initializeBlogs } from './reducers/blogReducer.js';
import { createBlogThunk } from './reducers/blogReducer.js';
import { setUserFunc, resetUserFunc } from './reducers/userReducer.js';
import blogService from './services/blogs.js';
import { initializeUsers } from './reducers/usersReducer.js';
import { Route, Routes } from 'react-router-dom';
import UserList from './components/UserList.jsx';
import User from './components/User.jsx';
import BlogView from './components/BlogView.jsx';
import NavBar from './components/NavBar.jsx';
import { Table } from 'react-bootstrap';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    store.dispatch(initializeBlogs());
    store.dispatch(initializeUsers());
  }, [useSelector((state) => state.notification)]);

  const blogs = useSelector((state) => state.blogs);

  const user = useSelector((state) => state.user);
  const tokenGlobal = useSelector((state) => state.user.token);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      store.dispatch(setUserFunc(user));
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
      store.dispatch(setUserFunc(user));
      blogService.setToken(token);
      setUsername('');
      setPassword('');
      store.dispatch(setNotiTimeOut(`${user.name} logged in successful`, 5));
    } catch (exception) {
      store.dispatch(setErrorTimeOut('Username or password incorrect', 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    resetUserFunc();
  };

  const createBlog = async (blogObject) => {
    event.preventDefault();
    try {
      blogFormRef.current.toggleVisibility();
      store.dispatch(createBlogThunk(blogObject, tokenGlobal));
      store.dispatch(
        setNotiTimeOut(
          `a new blog ${blogObject.title} by ${blogObject.author} added!`,
          5
        )
      );
    } catch (exception) {
      store.dispatch(setErrorTimeOut('issue with creating a post', 5));
    }
  };

  const sortBlogs = (blogs) => {
    console.log(blogs);
    const arrayForSort = [...blogs];
    return arrayForSort.sort((a, b) => b.likes - a.likes);
  };
  return (
    <div className="container">
      <h2>Blogs</h2>
      <NavBar user={user}></NavBar>
      {useSelector((state) => state.notification) !== '' && <Notification />}
      {useSelector((state) => state.error) !== '' && <Notification />}
      {}
      <Routes>
        <Route path="/users" element={<UserList></UserList>}></Route>
        <Route path="/users/:id" element={<User></User>}></Route>
        <Route path="/blogs/:id" element={<BlogView></BlogView>}></Route>
        <Route
          path="/blogs"
          element={
            useSelector((state) => state.user) < 1 ? (
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
                {`${user.name} is logged in`}
                <button onClick={() => handleLogout()}>Logout</button>
                <h2>create new</h2>
                <Togglable buttonLabel="blog" ref={blogFormRef}>
                  <BlogForm createBlog={createBlog} />
                </Togglable>
                <Table striped>
                  <tbody>
                    {sortBlogs(blogs).map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          <Blog key={blog.id} blog={blog} user={user} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
