"use client";
import { HomePage } from "@/components/site/HomePage.jsx";
import { useNav } from "@/lib/nav";

export default function Page() {
  const { go } = useNav();
  return <HomePage onNavigate={go} />;
}
