import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const userId = useParams().id;
  console.log(userId);
  const user = useSelector((state) => {
    return state.users.find((user) => user.id === userId);
  });
  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
