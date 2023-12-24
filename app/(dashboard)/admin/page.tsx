import React from 'react'
import { getServerSession } from 'next-auth';
// import { authOptions } from "../../../lib/auth";
import { authOptions } from "@/lib/auth";

 async function page(){
  const session = await getServerSession(authOptions);

    if (session?.user) {
      return <h2 className= 'text 4-xl'>Welcome to Gamer Date, {session.user.username}</h2>;
  }
    return (
      <h2>Please login to see your profile page </h2>
    )
}
export default page;

// async function page() {
//   const session = await getServerSession(authOptions);

//   // console.log(session);

//   if (session?.user) {
//     return <div>Welcome to your profile, {session.user.name}</div>;
//   } else {
//     return <div>Welcome!</div>;
//   }
// }

// export default page
