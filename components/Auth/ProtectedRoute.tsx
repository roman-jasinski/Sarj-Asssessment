"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

import { auth } from "@/config/firebaseConfig";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/signin");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return user ? children : null;
}
