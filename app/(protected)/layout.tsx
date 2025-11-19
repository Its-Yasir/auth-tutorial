import React from "react"
import NavBar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ( {children} : ProtectedLayoutProps ) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-sky-500 flex-col">
      <NavBar />
      {children}
    </div>
  )
}

export default ProtectedLayout