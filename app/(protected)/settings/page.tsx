"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { settings } from '@/actions/settings';
// import { useCurrentUser } from '@/hooks/use-current-user';
// import {  useSession } from 'next-auth/react';
// import {  signOut } from 'next-auth/react';
import React, { useTransition } from 'react'
import { useSession } from 'next-auth/react';

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  // const session  = useSession();
  //const user = useCurrentUser();

  // We can use this to do server thing in client component, like signOut is server componenet 
  // OR we can make a file with "use server" and import signOut in that file and import it here
  // const onClick = () => {
  //   signOut();
  // }

  const onClick = () => {
    startTransition(() => {
      settings({
        name: "New naammee!"
      })
        .then(() => {
          update();
        })
    })
  }

  return (
  //<div>{JSON.stringify(user)}
    <Card
      className='w-[600px] m-5'
    >
      <CardHeader>
        <p className='font-semibold text-2xl text-center'>
          ⚙️ Settings
        </p>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onClick}
          disabled={isPending}
        >
          Update name
        </Button>
      </CardContent>
    </Card>
  )
}

export default SettingsPage