import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MenuItem } from "@/app/interfaces/MenuItem";
import QrCode from "./QrCode";

// Helpers
import { getMenuItems } from "../helpers";

// The React Element
export default async function page({ params }: { params: { id: number } }) {
  const menuItems = await getMenuItems(params.id);
  return (
    <main>
      <div className="container menu-container mx-auto lg">
        {menuItems.map((menuItem: MenuItem) => (
          <div key={menuItem.id} className="card my-5">
            <h3>{menuItem.name}</h3>
            <p>{menuItem.description}</p>
            <p>{menuItem.price}</p>
          </div>
        ))}
        {menuItems.length === 0 && (
          <p className="text-center">There are no items on this menu</p>
        )}
        <Link href={`/menu/${params.id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </div>
      <QrCode menuId={params.id} />
    </main>
  );
}
