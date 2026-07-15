"use client";
import { VideoPage } from "@/components/site/VideoPage.jsx";
import { useNav } from "@/lib/nav";

export default function Page() {
  const { go } = useNav();
  return <VideoPage onNavigate={go} />;
}
