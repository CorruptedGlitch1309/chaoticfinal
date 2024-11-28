'use client';
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function page () {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/randomizer');
  }, []);

  return (
    <div>Main Page</div>
  )
}