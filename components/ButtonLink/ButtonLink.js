import Link from "next/link";
import React from "react";

export default function ButtonLink({ destination, label }) {
  return (
    <Link href={destination}>
      <a className="btn">{label}</a>
    </Link>
  );
}
