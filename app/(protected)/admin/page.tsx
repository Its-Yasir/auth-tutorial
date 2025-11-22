"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentRole } from "@/hooks/use-current-role";
import React from "react";

const AdminPage = () => {
  const role = useCurrentRole();
  const isAdmin: boolean = !!(role === "ADMIN");
  return (
    <div className="w-[600px] bg-white rounded-xl p-5 m-2 text-center">
      <div className="w-full bg-white rounded-xl p-5 m-2 text-center">
        You role is: {role}
      </div>
      {isAdmin && (
        <FormSuccess 
          message="You can access this page!"
        />
      )}
      {(!isAdmin) && (
        <FormError 
          message="You cannot access this page!"
        />
      )}
    </div>
  );
};

export default AdminPage;
