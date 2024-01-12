import React from "react";
import { MenuItem } from "@/app/interfaces/MenuItem";
import { getMenuItems } from "../../helpers";
import EditForm from "./EditForm";
import Delete from "./Delete";

interface menuId {
  menuId: boolean;
}

// The React Element
export default async function page({ params }: { params: { id: number } }) {
  const menuItems = await getMenuItems(params.id);
  // const [newItem, setNewItem] = useState(false);

  return (
    <main>
      <div className="container menu-container mx-auto lg">
        {menuItems.map((menuItem: MenuItem) => (
          <div key={menuItem.id} className="flex flex-row gap-20">
            <div>
              <h3>{menuItem.name}</h3>
              <p>{menuItem.description}</p>
              <p>{menuItem.price}</p>
            </div>
            <Delete id={menuItem.id} />
          </div>
        ))}
        {menuItems.length === 0 && (
          <p className="text-center">There are no items on this menu</p>
        )}

        {/* Add a menu item */}
        <EditForm menuId={params.id} />
      </div>
    </main>
  );
}
