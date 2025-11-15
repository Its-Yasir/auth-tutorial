import { auth } from '@/auth'
import React from 'react'

const page = async () => {
  const user = await auth();
  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default page