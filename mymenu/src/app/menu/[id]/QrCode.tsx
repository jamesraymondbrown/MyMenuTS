import React from "react";

export default function QrCode(props: { menuId: number }) {
  return (
    <>
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/menu/${props.menuId}&size=100x100`}
        alt=""
        title=""
      />
    </>
  );
}
