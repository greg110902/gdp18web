"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const id = 1;

  const router = useRouter();

  router.push(`/map/${id}`);

  return <></>;
}
