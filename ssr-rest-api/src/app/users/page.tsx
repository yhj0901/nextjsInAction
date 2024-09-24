import axios from 'axios';

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const getUsers = async () => {
  try {
    const userReq = await axios.get('http://18.208.212.49:8000/api/04/users/');

    return {
      users: userReq.data,
      error: null,
    };
  } catch {
    return {
      users: null,
      error: 'User not found or API call failed',
    };
  }
};

const usersPage = async () => {
  const { users, error } = await getUsers();

  if (error || !users) {
    return <div>{error || 'Users not found'}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.username}>
            <br />
            <a href={`/users/${user.username}`}>{user.username}</a>
            <p>Email: {user.email}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default usersPage;
