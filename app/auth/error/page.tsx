"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "OAuthAccountNotLinked") {
      Response.redirect(new URL('/auth/login'))
    } else {
      // Maybe show a generic message?
    }
  }, [error, router]);

  return <div>Loading...</div>;  // or whatever fallback
}