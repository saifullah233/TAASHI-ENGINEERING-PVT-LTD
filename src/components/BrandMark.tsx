import { useState } from "react";
import { approvedAssets } from "../data/assets";

export default function BrandMark({ light = false }: { light?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);
  const image = light ? approvedAssets.horizontalLogoOnDark ?? approvedAssets.horizontalLogo : approvedAssets.horizontalLogo;
  const useImage = Boolean(image && !failed);
  return (
    <a
      href="/#home"
      className={`brand ${light ? "brand--light" : ""} ${useImage ? "brand--asset" : ""} ${useImage && light && !approvedAssets.horizontalLogoOnDark ? "brand--plate" : ""}`}
      aria-label="Taashi Engineering home"
    >
      {useImage ? (
        <img className="brand-image" src={image!} alt="Taashi Engineering Private Limited" width="250" height="64" onError={() => setFailed(true)} />
      ) : <>
      <span className={`brand-symbol ${approvedAssets.standaloneIcon && !iconFailed ? "brand-symbol--asset" : ""}`} aria-hidden="true">
        {approvedAssets.standaloneIcon && !iconFailed ? (
          <img src={approvedAssets.standaloneIcon} alt="" width="46" height="46" onError={() => setIconFailed(true)} />
        ) : (
        <svg viewBox="0 0 62 62" role="presentation">
          <path d="M10 13H52V23H36V52H26V23H10Z" fill="currentColor" />
          <path
            d="m11 44 15-13h10l15 13"
            fill="none"
            stroke="#E88A3F"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
        )}
      </span>
      <span className="brand-words">
        <strong>TAASHI</strong>
        <small>ENGINEERING PVT. LTD.</small>
      </span>
      </>}
    </a>
  );
}

