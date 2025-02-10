"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const id = 1;

  location.replace(`/map/${id}`);

  return <></>;
}
