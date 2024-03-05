import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../store';
import { voteUp, addComment } from '../reducers/blogReducer';
import { setNotiTimeOut } from '../reducers/notificationReducer';
import { setErrorTimeOut } from '../reducers/errorReducer';

const BlogView = () => {
  const [comment, setComment] = useState('');
  const blogId = useParams().id;
  console.log(blogId);
  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === blogId);
  });

  console.log('eeee', blog);

  const handleCommentChange = async (comment, blogObject) => {
    event.preventDefault();
    try {
      console.log(blogObject);
      store.dispatch(addComment(comment, blogObject.id));
      store.dispatch(setNotiTimeOut(`added comment ${comment}`, 5));
      setComment('');
    } catch (exception) {
      store.dispatch(setErrorTimeOut('issue with adding a comment', 5));
    }
  };

  const handleUpdate = async (blogObject) => {
    event.preventDefault();
    try {
      console.log(blogObject);
      store.dispatch(voteUp(blogObject));
      store.dispatch(
        setNotiTimeOut(`You voted for "${blogObject.title}" !`, 5)
      );
    } catch (exception) {
      store.dispatch(setErrorTimeOut('issue with updating a post', 5));
    }
  };

  const handleVote = (blogObject) => {
    const likes = blogObject.likes;
    const user = blogObject.user.id;

    return { ...blogObject, likes: likes + 1, user: user };
  };

  if (!blog) {
    return null;
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <div>{blog.likes} likes</div>
      <button id="button-like" onClick={() => handleUpdate(handleVote(blog))}>
        like
      </button>
      <div>added by {blog.user.username}</div>
      <h2>comments</h2>

      <form onSubmit={() => handleCommentChange(comment, blog)}>
        <input
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button type="submit"></button>
      </form>
      <div>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogView;
