"use client";

import React, { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "../interfaces/MenuItem";
import { NewMenuItem } from "../interfaces/NewMenuItem";

export default function CreateForm(): ReactElement {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const newMenuItem: NewMenuItem = {
      name,
      description,
      price,
    };

    const newMenu = {
      user: 1,
      name: name,
      description: description,
    };

    const res: any = await fetch("http://localhost:8000/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenu),
    });

    const data = await res.json();

    console.log("data log", data);

    if (res.status === 200) {
      // router.refresh ensures that the menu data is re-fetched, so the new ticket is visible
      router.refresh();
      router.push(`/menu/${data.id}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container w-1/2 flex-col-w-gap"
    >
      <label>
        <span>Menu name:</span>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
      <label>
        <span>Price:</span>
        <input
          required
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </label>
      <button className="btn btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Menu</span>}
      </button>
    </form>
  );
}
