"use client";

import React, { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "../interfaces/MenuItem";

export default function CreateForm(): ReactElement {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const newMenuItem: MenuItem = {
      name,
      description,
      price,
    };
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 flex-col-w-gap">
      <label>
        <span>Name:</span>
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
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Menu</span>}
      </button>
    </form>
  );
}
