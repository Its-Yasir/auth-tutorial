'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const pathName = usePathname();
  return (
    <nav className='bg-secondary flex justify-between items-center w-[600px] rounded-xl shadow-sm p-4'>
      <div className='flex gap-x-2'>
        <Button
          asChild
          variant={pathName == '/settings' ? "default" : "outline"}
        >
          <Link
            href={'/settings'}
          >
            Settings
          </Link>
        </Button>
        <Button
          asChild
          variant={pathName == '/server' ? "default" : "outline"}
        >
          <Link
            href={'/server'}
          >
            Server
          </Link>
        </Button>
      </div>
      <p>USer Button</p>
    </nav>
  )
}

export default NavBar