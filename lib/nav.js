"use client";
/* Navigation helpers. The original PDG SPA used hash routing with an
 * onNavigate(tab, service) callback; here that maps onto real Next.js routes.
 * Service pre-selection for the contact page rides a ?service= query param. */
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export const TAB_PATHS = {
  home: "/",
  design: "/design",
  logos: "/logos",
  video: "/video",
  packages: "/packages",
  contact: "/contact",
};

export function tabFromPathname(pathname) {
  const entry = Object.entries(TAB_PATHS).find(([, p]) => p === pathname);
  return entry ? entry[0] : "home";
}

/* Scroll to an element within the current page, accounting for the sticky header. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: "smooth" });
}
export const scrollToServiceId = scrollToId;

export function useNav() {
  const router = useRouter();
  const pathname = usePathname();

  const go = useCallback((tab, service) => {
    let href = TAB_PATHS[tab] || "/";
    if (tab === "contact" && service) href += `?service=${encodeURIComponent(service)}`;
    router.push(href);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, [router]);

  const goSection = useCallback((id) => {
    const scroll = () => scrollToId(id);
    if (pathname !== "/") {
      router.push("/");
      window.setTimeout(scroll, 90);
    } else {
      scroll();
    }
  }, [router, pathname]);

  return { go, goSection, tab: tabFromPathname(pathname) };
}
