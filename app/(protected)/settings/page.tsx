"use client";
import { LogoutButton } from '@/components/auth/logout-button';
// import { useCurrentUser } from '@/hooks/use-current-user';
// import {  useSession } from 'next-auth/react';
// import {  signOut } from 'next-auth/react';
import React from 'react'

const SettingsPage = () => {
  // const session  = useSession();
  //const user = useCurrentUser();

  // We can use this to do server thing in client component, like signOut is server componenet 
  // OR we can make a file with "use server" and import signOut in that file and import it here
  // const onClick = () => {
  //   signOut();
  // }

  return (
  //<div>{JSON.stringify(user)}
    <div className='bg-white-10 p-10'>
        <LogoutButton>
          Logout
        </LogoutButton>
    </div>
  )
}

export default SettingsPage