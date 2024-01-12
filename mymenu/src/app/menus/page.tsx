import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Menu } from "../interfaces/Menu";
import { getMenus } from "./helpers";

// The React Element
export default async function page({ params }: { params: { id: number } }) {
  const menus = await getMenus();

  return (
    <main>
      <div className="container menu-container mx-auto lg">
        {menus.map((menu: Menu) => (
          <div key={menu.id} className="card my-5">
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
          </div>
        ))}
        {menus.length === 0 && (
          <p className="text-center">There are no items on this menu</p>
        )}
        <Link href={`/menu/${params.id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </main>
  );
}
