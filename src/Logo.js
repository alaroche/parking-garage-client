import * as React from "react";

const SvgLogo = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} {...props}>
    <rect
      style={{
        opacity: 1,
        fill: "#204a87",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 4,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        strokeDashoffset: 0,
        strokeOpacity: 1,
      }}
      width={128}
      height={128}
      rx={14.173}
      ry={14.173}
    />
    <path
      style={{
        fontSize: 144,
        fontStyle: "normal",
        fontWeight: 700,
        textAlign: "center",
        textAnchor: "middle",
        fill: "#fff",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 1,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeOpacity: 1,
        fontFamily: "DejaVu Sans",
      }}
      d="M23.52 11.512h44.93c13.36 0 23.602 2.976 30.727 8.93 7.172 5.906 10.758 14.343 10.758 25.312 0 11.016-3.586 19.5-10.758 25.453-7.125 5.906-17.367 8.86-30.726 8.86H50.59v36.421h-27.07V11.512m27.07 19.617v29.32h14.977c5.25 0 9.304-1.265 12.164-3.797 2.86-2.578 4.289-6.21 4.289-10.898s-1.43-8.297-4.29-10.828c-2.859-2.531-6.913-3.797-12.163-3.797H50.59"
    />
  </svg>
);

export default SvgLogo;

