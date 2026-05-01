"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUp } from "lucide-react";

type GoToTopButtonProps = {
  variant?: "site" | "admin";
};

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GoToTopButton({ variant = "site" }: GoToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(scrollTop > 360);
      setProgress(scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const styles = useMemo(
    () => ({
      background: `conic-gradient(#c89b3c ${Math.round(
        progress * 360,
      )}deg, rgba(255,255,255,0.38) 0deg)`,
    }),
    [progress],
  );

  const scrollToTop = () => {
    if (prefersReducedMotion()) {
      window.scrollTo({ top: 0 });
      return;
    }

    const startY = window.scrollY || document.documentElement.scrollTop;
    const duration = 900;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const amount = Math.min(elapsed / duration, 1);
      const easedAmount = easeOutCubic(amount);

      window.scrollTo(0, Math.round(startY * (1 - easedAmount)));

      if (amount < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const innerTone =
    variant === "admin"
      ? "bg-white text-university-navy shadow-[0_16px_36px_rgba(15,23,42,0.22)] hover:bg-university-navy hover:text-white"
      : "bg-university-navy text-university-gold shadow-[0_16px_36px_rgba(11,35,65,0.28)] hover:bg-university-gold hover:text-university-navy";

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Go to top"
      title="Go to top"
      className={`group fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full p-0.5 transition duration-300 ease-out sm:bottom-6 sm:right-6 ${
        isVisible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
      style={styles}
    >
      <span
        className={`grid h-full w-full place-items-center rounded-full transition duration-300 ${innerTone}`}
      >
        <ArrowUp
          size={20}
          strokeWidth={2.4}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </span>
    </button>
  );
}
