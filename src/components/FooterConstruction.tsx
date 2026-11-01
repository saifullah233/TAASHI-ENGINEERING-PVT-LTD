export function ConstructionSketch() {
  return (
    <svg
      className="footer-construction"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 180"
      width="520"
      height="180"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* A quiet architectural sketch, rather than a project photograph. */}
      <g stroke="#52798a" strokeWidth="1" opacity=".38">
        <path d="M22 157h476M40 169h424M63 151V97h32v54M72 97V86h14v11M437 151V112h38v39M446 112V99h20v13" />
        <path d="M40 151h440M88 173l52-31m-4 31 52-31m-4 31 52-31m-4 31 52-31m-4 31 52-31m-4 31 52-31" strokeDasharray="3 5" />
      </g>

      <g stroke="#7b9ba8" strokeWidth="1.35" strokeLinejoin="round">
        <path d="m104 80 146 16v57l-146-17V80Z" fill="#294b5c" fillOpacity=".22" />
        <path d="m250 96 68-27v57l-68 27V96Z" fill="#294b5c" fillOpacity=".4" />
        <path d="m104 80 67-27 147 16-68 27-146-16Z" fill="#52798a" fillOpacity=".14" />
        <path d="m104 99 146 16 68-27M104 118l146 16 68-27M134 84v55m39-51v55m39-51v55m64-61v57m23-66v57" />
        <path d="M104 136v16m146 1v9m68-36v26M97 153l158 18 73-30" opacity=".5" />
        <path d="m111 75 147 16 52-21" stroke="#e88a3f" data-motion="highlight" />
      </g>

      <g stroke="#7596a5" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
        <path d="M353 157V27h13v130M353 37l13 15-13 15 13 15-13 15 13 15-13 15 13 15-13 15M344 157h31" />
        <path d="M231 29h222v9H231zM240 29l20 9 20-9 20 9 20-9 20 9 20-9 20 9 20-9 20 9 20-9" />
        <path d="m270 29 89-20 72 20M359 9v18" />
        <path d="M426 38v49" data-motion="cable" />
        <g data-motion="hook">
          <path d="M423 87h6" />
          <path d="M426 87v8a4 4 0 0 1-8 0" stroke="#e88a3f" strokeWidth="2" />
        </g>
        <path d="M231 39v11h23V39" fill="#52798a" fillOpacity=".25" />
      </g>

      <g stroke="#e88a3f" strokeWidth="1.5" strokeLinecap="square" data-motion="highlight">
        <path d="M29 132v12m-6-6h12M386 157h35" />
      </g>
      <path d="M104 48V32m-8 8h16M329 132h10m-5-5v10" stroke="#52798a" strokeWidth="1" opacity=".6" />
    </svg>
  );
}

export default function FooterConstruction() {
  return (
    <picture aria-hidden="true">
      <source media="(prefers-reduced-motion: reduce)" srcSet="/images/footer-construction.svg" />
      <img className="footer-construction" src="/images/footer-construction.gif" alt="" width="520" height="180" loading="lazy" decoding="async" />
    </picture>
  );
}
