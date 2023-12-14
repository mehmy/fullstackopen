import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          <tr>
            <th>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </th>
            <th>has {user.blogs.length} blogs</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const UserList = () => {
  const users = useSelector((state) => state.users);
  return users.map((user) => <User key={user.id} user={user} />);
};

export default UserList;
