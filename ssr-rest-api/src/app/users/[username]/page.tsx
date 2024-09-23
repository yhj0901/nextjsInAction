import React from 'react';
import axios from 'axios';

interface UserPageProps {
  params: {
    username: string;
  };
}

const getPost = async (username: string) => {
  console.log('#############', username);
  try {
    const userReq = await axios.get(
      `http://18.208.212.49:8000/api/04/users/${username}/`
    );

    return {
      user: userReq.data,
      error: null,
    };
  } catch {
    return {
      user: null,
      error: 'User not found or API call failed',
    };
  }
};

const UserPage = async ({ params }: UserPageProps) => {
  const { user, error } = await getPost(params.username);

  if (error || !user) {
    return <div>{error || 'User not found'}</div>;
  }
  const { username, email, first_name, last_name } = user;

  return (
    <div>
      <h1>{username}</h1>
      <p>Email: {email}</p>
      <p>First Name: {first_name}</p>
      <p>Last Name: {last_name}</p>
    </div>
  );
};

export default UserPage;
