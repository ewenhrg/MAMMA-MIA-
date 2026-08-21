"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { usePointerFine, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

type CtaProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "md" | "sm";
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  cursorLabel?: string;
  ariaLabel?: string;
};

/**
 * Shared call to action. On fine pointers it leans very slightly toward the
 * cursor, which reads as "alive" without ever moving far enough to be hard to hit.
 */
export function Cta({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  external = false,
  icon,
  className,
  disabled = false,
  cursorLabel,
  ariaLabel,
}: CtaProps) {
  const ref = useRef<HTMLElement | null>(null);
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const magnetic = fine && !reduced;

  const onMove = (event: MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.24;
    ref.current.style.setProperty("translate", `${x}px ${y}px`);
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("translate", "0px 0px");
  };

  const classes = cn(
    "btn",
    variant === "primary" ? "btn--primary" : "btn--ghost",
    size === "sm" && "btn--sm",
    disabled && "pointer-events-none opacity-45",
    className,
  );

  const inner = (
    <>
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__label">
        {children}
        {icon}
      </span>
    </>
  );

  const shared = {
    className: classes,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    "data-cursor": cursorLabel,
    "aria-label": ariaLabel,
    style: { transitionProperty: "translate, transform, color, border-color" },
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...shared}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...shared}
    >
      {inner}
    </button>
  );
}
