"use client";
import { AuthService } from "@/service/Firebase/auth";
import { useAuthContext } from "@/service/Firebase/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const authService = new AuthService();
  const auth = authService.auth;
  const user = useAuthContext();
  const handleSignOut = async () => {
    await auth.signOut();
  };
  return (
    <main className="p-4">
      <h1>Hello, this is home</h1>
      <Link href="/" onClick={handleSignOut}>
        Sign Out
      </Link>
    </main>
  );
}
