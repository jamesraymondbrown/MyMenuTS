import React, { ReactElement } from "react";
import CreateForm from "./CreateForm";

export default function CreateTicket(): ReactElement {
  return (
    <main className="container flex-col-w-gap">
      <h2 className="text-primary text-center">Add a new menu</h2>
      <CreateForm />
    </main>
  );
}
