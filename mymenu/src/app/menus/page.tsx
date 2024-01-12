import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Menu } from "../interfaces/Menu";
import { getMenus } from "./helpers";
import Delete from "./Delete";

// The React Element
export default async function page({ params }: { params: { id: number } }) {
  const menus = await getMenus();

  return (
    <main>
      <div className="container menu-container mx-auto lg flex flex-col gap-5">
        {menus.map((menu: Menu) => (
          <div key={menu.id} className="flex flex-row gap-10">
            <div>
              <h3>{menu.name}</h3>
              <p>{menu.description}</p>
            </div>
            <div className="flex flex-row gap-4">
              <Link href={`/menu/${menu.id}`} className="btn btn-primary">
                View
              </Link>
              <Link href={`/menu/${menu.id}/edit`} className="btn btn-warning">
                Edit
              </Link>
              <Delete id={menu.id} />
            </div>
          </div>
        ))}
        {menus.length === 0 && (
          <p className="text-center">There are no items on this menu</p>
        )}
      </div>
    </main>
  );
}
