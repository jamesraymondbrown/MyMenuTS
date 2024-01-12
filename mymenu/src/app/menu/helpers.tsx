import { notFound } from "next/navigation";

export default async function getMenuItems(id: Number) {
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
