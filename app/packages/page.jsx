"use client";
import { PackagesPage } from "@/components/site/PackagesPage.jsx";
import { useNav } from "@/lib/nav";

export default function Page() {
  const { go } = useNav();
  return <PackagesPage onNavigate={go} />;
}
