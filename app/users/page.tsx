import React from 'react'
import { Button } from '@radix-ui/themes'


interface User {
    id: number;
  name: string;
  username: string;
  email: string;
};


const Userspage = async () => {
  

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
       const users: User[] = await res.json();

       

  return (
    <div>
     <h1>Users</h1>
     {users.map(user => <li key={user.id}>{user.name}</li>)}
     <Button>New Player</Button>
    </div>
  )
}

export default Userspage
