import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  return (
    <nav>
      <h1>Jimmy&apos;s Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/menus">Menus</Link>
      <Link href="/create">Create New Menu</Link>
    </nav>
  );
}
