"use client";
import { UserAuth } from "@/service/Firebase/AuthContext";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { currentUser, signIn, signOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/demo">Demo</Link>
        </li>
        {currentUser ? (
          <li className="p-2 cursor-pointer">
            <Link href="/task">Your Tasks</Link>
          </li>
        ) : null}
      </ul>
      {!currentUser ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Sign In with Google
          </li>
        </ul>
      ) : (
        <div>
          <p>Welcome, {currentUser.displayName}</p>
          <p className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
