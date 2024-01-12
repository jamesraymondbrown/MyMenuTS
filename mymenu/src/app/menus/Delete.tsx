"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Delete(props: { id: number }) {
  const router = useRouter();
  const deleteMenu = async (id: number) => {
    const userConfirm = confirm(
      "Are you sure you want to delete this Menu?\n This action cannot be undone"
    );

    if (userConfirm) {
      const res: any = await fetch(`http://localhost:8000/menus/${props.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.status < 300) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={() => deleteMenu(props.id)} className="btn btn-error">
      Delete
    </button>
  );
}
