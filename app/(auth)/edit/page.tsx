// import React from 'react';
// import EditForm from '@/app/components/forms/EditForm';
// import { Session } from 'inspector';

// const edit = () => {  
//   return (
//     <div>
//       <EditForm />
     

//     </div>
//   )
// };

// export default edit;


import React from 'react'
import EditForm from '@/app/components/forms/EditForm';
import { getServerSession } from 'next-auth';
// import { authOptions } from "../../../lib/auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';

 async function edit(){
  const session = await getServerSession(authOptions);
  // console.log(session);

    if (session?.user) {
      return (
        <div>
          <EditForm />
        </div>
  )}
  return (
    <h2>Please <Link className='text-blue-500 hover:underline' href= '/login'> login </Link>  to see and edit your profile page </h2>
  )
}
export default edit;
