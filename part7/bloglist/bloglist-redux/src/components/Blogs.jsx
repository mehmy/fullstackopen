import { useState, useEffect, useRef } from 'react';
import Blog from './Blog';
import loginService from '../services/login';
import Notification from './Notification';
import LoginForm from './Loginform';
import BlogForm from './BlogForm.jsx';
import Togglable from './Togglable';
import { useSelector } from 'react-redux';
import { setNotiTimeOut } from '../reducers/notificationReducer.js';
import { setErrorTimeOut } from '../reducers/errorReducer.js';
import store from '../store.js';
import { initializeBlogs } from '../reducers/blogReducer.js';
import { createBlogThunk } from '../reducers/blogReducer.js';
import { setUserFunc, resetUserFunc } from '../reducers/userReducer.js';
import blogService from '../services/blogs.js';
import { initializeUsers } from '../reducers/usersReducer.js';
import { Route, Routes } from 'react-router-dom';
import UserList from './UserList.jsx';
import User from './User.jsx';
import BlogView from './BlogView.jsx';
import NavBar from './NavBar.jsx';

const Blogs = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    resetUserFunc();
  };

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
    <div>
      {useSelector((state) => state.user) < 1 ? (
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
        </div>
      )}
      {}
      {/* {console.log(blogs.sort((a, b) => b.likes - a.likes))} */}
      {sortBlogs(blogs).map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Blogs;
