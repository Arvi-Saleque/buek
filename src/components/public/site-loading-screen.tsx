"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteSettings } from "@/lib/types";

type LoaderPhase = "visible" | "leaving" | "hidden";

export function SiteLoadingScreen({ settings }: { settings: SiteSettings }) {
  const [phase, setPhase] = useState<LoaderPhase>("visible");
  const logoUrl = settings.logo?.url || "/images/logo.png";
  const logoAlt = settings.logo?.altText || `${settings.universityName} logo`;
  const acronym = settings.universityName.match(/\(([^)]+)\)\s*$/)?.[1];
  const displayTitle = acronym || settings.universityName;
  const displayName = acronym
    ? settings.universityName.replace(/\s*\([^)]*\)\s*$/, "")
    : "";

  useEffect(() => {
    let completed = false;
    let leaveTimer: number | undefined;
    let removeTimer: number | undefined;
    const startedAt = window.performance.now();
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const finish = () => {
      if (completed) return;
      completed = true;

      const elapsed = window.performance.now() - startedAt;
      const delay = Math.max(0, 1250 - elapsed);

      leaveTimer = window.setTimeout(() => {
        setPhase("leaving");
        removeTimer = window.setTimeout(() => {
          document.body.style.overflow = previousOverflow;
          setPhase("hidden");
        }, 520);
      }, delay);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const safetyTimer = window.setTimeout(finish, 2600);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(safetyTimer);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`site-loader ${phase === "leaving" ? "site-loader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${settings.universityName}`}
    >
      <div className="site-loader__grid" aria-hidden="true" />
      <div className="site-loader__accent site-loader__accent--top" aria-hidden="true" />
      <div className="site-loader__accent site-loader__accent--bottom" aria-hidden="true" />

      <div className="site-loader__content">
        <div className="site-loader__seal" aria-hidden="true">
          <span className="site-loader__orbit site-loader__orbit--outer" />
          <span className="site-loader__orbit site-loader__orbit--inner" />
          <span className="site-loader__crest">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={116}
                height={116}
                priority
                className="site-loader__logo"
              />
            ) : (
              <BookOpen size={44} strokeWidth={1.8} />
            )}
          </span>
        </div>

        <div className="site-loader__copy">
          <p className="site-loader__eyebrow">Welcome to</p>
          <h1 className="site-loader__title">{displayTitle}</h1>
          {displayName ? <p className="site-loader__name">{displayName}</p> : null}
          <p className="site-loader__tagline">{settings.tagline}</p>
        </div>

        <div className="site-loader__progress" aria-hidden="true">
          <span />
        </div>
        <p className="site-loader__status">Loading...</p>
      </div>
    </div>
  );
}
