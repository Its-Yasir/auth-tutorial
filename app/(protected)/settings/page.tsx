"use client";
import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import {  useSession } from 'next-auth/react';
//!import {  signOut } from 'next-auth/react';
import React from 'react'

const SettingsPage = () => {
  const session  = useSession();
  
  //! We can use this to do server thing in client component, like signOut is server componenet 
  //! OR we can make a file with "use server" and import signOut in that file and import it here
  //! const onClick = () => {
  //!   signOut();
  //! }

  const onClick = () => {
    logout();
  }
  return (
    <div>{JSON.stringify(session)}
        <Button
          type='submit'
          onClick={onClick}
        >
          Sign Out
        </Button>
    </div>
  )
}

export default SettingsPage