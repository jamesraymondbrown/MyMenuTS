import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./dojo-logo.png";

export default function NavBar() {
  return (
    <nav>
      <h1>Jimmy&apos;s Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/menu/1">Menus</Link>
      <Link href="/tickets/create">Create New Ticket</Link>
    </nav>
  );
}
