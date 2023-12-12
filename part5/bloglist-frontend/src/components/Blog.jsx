import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blog = ({ blog, setErrorMessage, setNotifMessage, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleUpdate = async (blogObject) => {
    event.preventDefault();
    try {
      console.log(blogObject);

      const blog = await blogService.updateBlog(blogObject);
      setNotifMessage(`blog ${blog.title} by ${blog.author} updated!`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('issue with updating a post');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async (blogObject) => {
    event.preventDefault();
    try {
      console.log(blogObject);
      blogService.setToken(user.token);
      if (window.confirm(`Remove blog ${blogObject.title} by ${blog.author}`)) {
        const blog = await blogService.deleteBlog(blogObject.id);
        setNotifMessage(
          `blog ${blogObject.title} by ${blogObject.author} deleted!`
        );
        setTimeout(() => {
          setNotifMessage(null);
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage('issue with deleting a post');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleVote = (blogObject) => {
    const likes = blogObject.likes;
    const user = blogObject.user.id;

    return { ...blogObject, likes: likes + 1, user: user };
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
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
