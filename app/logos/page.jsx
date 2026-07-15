"use client";
import { LogosPage } from "@/components/site/LogosPage.jsx";
import { useNav } from "@/lib/nav";

export default function Page() {
  const { go } = useNav();
  return <LogosPage onNavigate={go} />;
}
