"use client";
import Image from "next/image";
import { useContext } from "react";

// export default function Wrapper() {
//   const user = useAuthContext();
//   console.log(user);
//   return <main className="p-4">{user ? <Home /> : <SignIn />}</main>;
// }

export default function Wrapper() {
  return (
    <main className="p-4">
      <h1>Home Page</h1>
    </main>
  );
}
