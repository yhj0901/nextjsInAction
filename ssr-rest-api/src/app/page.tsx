import Link from 'next/link';
import axios from 'axios';

// // app 디렉토리 내에는 getServerSideProps 함수를 사용할 수 없습니다.
// export async function getServerSideProps() {
//   // 여기서 REST API를 호출하고 데이터를 가져옵니다.
//   const userReq = await axios.get('http://localhost:300/api/04/users');
//   return {
//     props: {
//       users: userReq.data,
//     },
//   };
// }

// 서버 사이드에서는 이렇게 사용해야함
interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

async function fetchUsers(): Promise<User> {
  const userReq = await axios.get(
    'http://18.208.212.49:8000/api/04/users/hjyang/'
  );

  console.log('#############', userReq.data);
  return userReq.data;
}

export default async function Home() {
  const users = await fetchUsers();
  return (
    <ul>
      <li key={users.username}>
        <Link href={`/users/${users.username}`} passHref>
          {users.username}
          <br />
          {users.email}
          <br />
          {users.first_name}
          <br />
          {users.last_name}
          <br />
        </Link>
      </li>
    </ul>
  );
}
