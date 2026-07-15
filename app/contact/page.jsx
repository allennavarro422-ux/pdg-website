"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContactPage } from "@/components/site/ContactPage.jsx";

function ContactWithParams() {
  const params = useSearchParams();
  const service = params.get("service") || "";
  return <ContactPage preselectService={service} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ContactWithParams />
    </Suspense>
  );
}
