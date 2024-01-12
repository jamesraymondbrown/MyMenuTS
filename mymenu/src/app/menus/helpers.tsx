import { notFound } from "next/navigation";

export async function getMenus() {
  const res = await fetch(`http://localhost:8000/menus`, {
    next: {
      revalidate: 0,
    },
  });

  // Creates a 404 if menu id doesn't exist
  if (!res.ok) {
    notFound();
  }

  return res.json();
}
