"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Delete(props: { id: number }) {
  const router = useRouter();
  const deleteItem = async (id: number) => {
    // setIsLoading(true);

    const res: any = await fetch(`http://localhost:8000/menu-items/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    console.log("data log", data);
    console.log("status", res.status);

    if (res.status < 300) {
      // router.refresh ensures that the menu data is re-fetched, so the new ticket is visible
      router.refresh();
    }
  };

  return (
    <button
      onClick={() => deleteItem(props.id)}
      className="btn btn-circle btn-outline small"
    >
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
