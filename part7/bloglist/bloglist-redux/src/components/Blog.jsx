import Togglable from './Togglable';
import blogService from '../services/blogs';
import { setNotiTimeOut } from '../reducers/notificationReducer.js';
import { setErrorTimeOut } from '../reducers/errorReducer.js';
import store from '../store.js';
import { voteUp } from '../reducers/blogReducer.js';
import { deleteBlog } from '../reducers/blogReducer.js';
import { Link } from 'react-router-dom';

const Blog = ({ blog, user }) => {
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

  const handleDelete = async (blogObject) => {
    event.preventDefault();
    try {
      console.log(blogObject);
      blogService.setToken(user.token);
      if (window.confirm(`Remove blog ${blogObject.title} by ${blog.author}`)) {
        store.dispatch(deleteBlog(blogObject.id));
        store.dispatch(
          setNotiTimeOut(
            `blog ${blogObject.title} by ${blogObject.author} deleted!`,
            5
          )
        );
      }
    } catch (exception) {
      store.dispatch(setErrorTimeOut('issue with deleting a post', 5));
    }
  };

  const handleVote = (blogObject) => {
    const likes = blogObject.likes;
    const user = blogObject.user.id;

    return { ...blogObject, likes: likes + 1, user: user };
  };

  return (
    <div>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <Togglable buttonLabel="view" buttonClose="hide">
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{' '}
            <button
              id="button-like"
              onClick={() => handleUpdate(handleVote(blog))}
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            <button id="button-delete" onClick={() => handleDelete(blog)}>
              delete
            </button>
          </div>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
