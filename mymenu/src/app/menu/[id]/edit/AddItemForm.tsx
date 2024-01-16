"use client";

import React, { useState } from "react";
import { NewMenuItem } from "@/app/interfaces/NewMenuItem";
import { useRouter } from "next/navigation";

export default function AddItemForm(props: { menuId: number }) {
  const router = useRouter();

  const [displayForm, setDisplayForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => {
    return setDisplayForm(!displayForm);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const newMenuItem: NewMenuItem = {
      menuId: props.menuId,
      name,
      description,
      price,
    };

    const res: any = await fetch("http://localhost:8000/menu-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenuItem),
    });

    const data = await res.json();

    console.log("data log", data);

    if (res.status < 300) {
      // router.refresh ensures that the menu data is re-fetched, so the new ticket is visible
      router.refresh();
      toggleForm();
      setIsLoading(false);
    } else {
      console.log("status", res.status);
    }
  };

  return (
    <>
      <button onClick={toggleForm} className="btn btn-circle btn-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v12M6 12h12"
          />
        </svg>
      </button>

      {displayForm && (
        <form
          onSubmit={handleSubmit}
          className="form-container w-1/2 flex-col-w-gap"
        >
          <label>
            <span>Item Name:</span>
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
              step=".01"
              min="0"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </label>
          <button className="btn btn-primary" disabled={isLoading}>
            {isLoading && <span>Adding...</span>}
            {!isLoading && <span>Add Menu</span>}
          </button>
        </form>
      )}
    </>
  );
}
