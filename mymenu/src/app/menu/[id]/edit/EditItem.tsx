"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NewMenuItem } from "@/app/interfaces/NewMenuItem";
import { EditMenuItem } from "@/app/interfaces/EditMenuItem";

export default function EditItem(props: {
  id: number;
  name: string;
  description: string;
  price: number;
}) {
  const router = useRouter();
  const [displayForm, setDisplayForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState(props.price);

  const toggleForm = () => {
    console.log("snail");
    return setDisplayForm(!displayForm);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const EditedMenuItem: EditMenuItem = {
      name,
      description,
      price,
      id: props.id,
    };

    console.log("json", JSON.stringify(EditedMenuItem));

    const res: any = await fetch(
      `http://localhost:8000/menu-items/${props.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(EditedMenuItem),
      }
    );

    const data = await res.json();

    console.log("data log", data);
    console.log("status", res.status);

    if (res.status < 300) {
      // router.refresh ensures that the menu data is re-fetched, so the new ticket is visible
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <>
      <button onClick={toggleForm} className="btn btn-circle btn-outline small">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil"
          viewBox="0 0 16 16"
        >
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
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
