import { ErrorCard } from '@/components/auth/error-card'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className="w-full h-full items-center flex justify-center bg-sky-400">
      <ErrorCard
        error="Email already used!"
      />
    </div>
  )
}

export default ErrorPage;