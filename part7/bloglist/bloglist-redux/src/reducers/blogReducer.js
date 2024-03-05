import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { useSelector } from 'react-redux';

export const getId = () => (100000 * Math.random()).toFixed(0);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload.id;
      console.log(id);
      const blogToChange = state.find((n) => n.id === id);
      console.log(blogToChange);

      const changedBlog = {
        ...action.payload,
      };

      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.comments.push(action.payload);
    },
  },
});

export const { incrementVote, appendBlog, setBlogs, appendComment } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlogThunk = (content, token) => {
  return async (dispatch) => {
    blogService.setToken(token);
    console.log(content);
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const voteUp = (id) => {
  return async (dispatch) => {
    console.log(id);
    const updatedBlog = await blogService.updateBlog(id);
    dispatch(incrementVote(updatedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    console.log(id);
    const deletedBlog = await blogService.deleteBlog(id);
    console.log(deleteBlog);
    initializeBlogs();
  };
};
export const addComment = (comment, id) => {
  return async (dispatch) => {
    const commentBlog = await blogService.addComment(comment, id);
    initializeBlogs();
  };
};
export default blogSlice.reducer;
