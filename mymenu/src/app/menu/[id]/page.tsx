import React, { ReactElement } from "react";
import { notFound } from "next/navigation";

// Fetching menu data from our server
async function getMenuItems(id: Number) {
  const res = await fetch(`http://localhost:8000/menu-items/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  // Creates a 404 if menu id doesn't exist
  if (!res.ok) {
    notFound();
  }

  return res.json();
}

// The React Element
export default async function page({ params }: { params: { id: number } }) {
  const menuItems = await getMenuItems(params.id);
  return (
    <main>
      <div className="container menu-container mx-auto lg">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} className="card my-5">
            <h3>{menuItem.name}</h3>
            <p>{menuItem.description}</p>
            <p>{menuItem.price}</p>
          </div>
        ))}
        {menuItems.length === 0 && (
          <p className="text-center">There are no items on this menu</p>
        )}
      </div>
    </main>
  );
}
