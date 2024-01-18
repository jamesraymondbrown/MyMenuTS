"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function NavBar() {
  return (
    <nav>
      <h1>Jimmy&apos;s Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/menus">Menus</Link>
      <Link href="/create">Create New Menu</Link>
      <AuthButton />
    </nav>
  );
}
