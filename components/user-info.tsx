import { ExtendedUser } from '@/next-auth'
import React from 'react'



interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo = ({
  user, label
}: UserInfoProps) => {
  return (
    <div
      className='bg-white p-4 m-4 rounded-xl w-[600px]'
    >
      <header className='font-semibold text-2xl w-max m-auto'>
        {label}
      </header>
      <main>
        <div
          className='flex items-center justify-between rounded-lg border p-3 shadow-sm m-4'
        >
          <p className='text-sm font-medium'>
            ID
          </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.id}
          </p>
        </div>
        <div
          className='flex items-center justify-between rounded-lg border p-3 shadow-sm m-4'
        >
          <p className='text-sm font-medium'>
            Name
          </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.name}
          </p>
        </div>
        <div
          className='flex items-center justify-between rounded-lg border p-3 shadow-sm m-4'
        >
          <p className='text-sm font-medium'>
            Email
          </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.email}
          </p>
        </div>

      </main>
    </div>
  )
}

export default UserInfo