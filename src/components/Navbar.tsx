"use client";
import { UserAuth } from "@/service/Firebase/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const { currentUser, signIn, signOut } = UserAuth();

  const [page, setPage] = useState(0);

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
    <div className="h-20 w-full flex items-center justify-between p-2 absolute text-f2 tracking-widest z-50">
      <ul className="flex px-2">
        <li className="p-2 cursor-pointer mx-4">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer mx-4">
          <Link href="/demo">Demo</Link>
        </li>
        {currentUser ? (
          <li className="p-2 cursor-pointer mx-4">
            <Link href="/task">Your Tasks</Link>
          </li>
        ) : null}
      </ul>
      {!currentUser ? (
        <ul className="border border-f2 border-opacity-30 rounded-full px-8 hover:bg-f2 hover:bg-opacity-10">
          <li onClick={handleSignIn} className="p-2 cursor-pointer ">
            Sign In with Google
          </li>
        </ul>
      ) : (
        <div className="flex items-center text-f2 tracking-widest">
          {/* <div>
            {currentUser.photoURL === null ? null : (
              <Image fill alt="" src={currentUser.photoURL} />
            )}
            <div>{currentUser.displayName}</div>
          </div> */}
          <div className="cursor-pointer mx-4">
            {currentUser.displayName === null
              ? "Username"
              : currentUser.displayName}
          </div>
          <div
            className="cursor-pointer border border-f2 border-opacity-30 rounded-full mx-4 px-8 py-2 hover:bg-f2 hover:bg-opacity-10"
            onClick={handleSignOut}
          >
            Sign out
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
