import type { ReactNode } from "react";

export type IconName =
  | "arrow"
  | "arrow-up"
  | "menu"
  | "close"
  | "building"
  | "layers"
  | "road"
  | "helmet"
  | "check"
  | "mail"
  | "pin"
  | "north-east"
  | "chevron"
  | "quote"
  | "phone"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "youtube"
  | "x";

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  const shapes: Record<IconName, ReactNode> = {
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7M7.5 7v.2M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M14.5 21v-8H18l.5-4h-4V7c0-1.2.4-2 2-2H19V1.5c-.7-.1-2-.2-3.5-.2C12 1.3 10 3.4 10 7v2H7v4h3v8" />,
    youtube: <><rect x="2.5" y="5" width="19" height="14" rx="4" /><path d="m10 9 5 3-5 3V9Z" /></>,
    x: <><path d="M4 3h4l12 18h-4L4 3ZM20 3 4 21" /></>,
    arrow: (
      <>
        <path d="M4 12h16" />
        <path d="m13 5 7 7-7 7" />
      </>
    ),
    "arrow-up": (
      <>
        <path d="m5 19 14-14" />
        <path d="M7 5h12v12" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="M5 5l14 14M19 5 5 19" />
      </>
    ),
    building: (
      <>
        <rect x="3.5" y="6" width="17" height="15" rx="1" />
        <path d="M8 6V3h8v3M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-4h4v4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    road: (
      <>
        <path d="M9 3 5 21M15 3l4 18M11 6v3m2 5v4" />
      </>
    ),
    helmet: (
      <>
        <path d="M4 16v-3a8 8 0 0 1 16 0v3M2.5 16.5h19a2 2 0 0 1-2 3H4.5a2 2 0 0 1-2-3ZM12 5v11" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    mail: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    "north-east": (
      <>
        <path d="M5 19 19 5M7 5h12v12" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    quote: (
      <>
        <path d="M10 9H5v6h5V9Zm9 0h-5v6h5V9ZM5 9a5 5 0 0 1 5-5M14 9a5 5 0 0 1 5-5" />
      </>
    ),
    phone: (
      <path d="M7.5 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2.5l-5-2-2.3 2.3a13 13 0 0 1-6.5-6.5L9.5 8 7.5 3Z" />
    ),
  };
  return <svg {...common}>{shapes[name]}</svg>;
}

