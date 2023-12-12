import React from 'react';
import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const addBlog = (event) => {
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });
    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          id="title"
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id="author"
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id="url"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button id="submit-button" type="submit">
        save
      </button>
    </form>
  );
};

export default BlogForm;
