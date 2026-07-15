"use client";
import { DesignPage } from "@/components/site/DesignPage.jsx";
import { useNav } from "@/lib/nav";

export default function Page() {
  const { go } = useNav();
  return <DesignPage onNavigate={go} />;
}
