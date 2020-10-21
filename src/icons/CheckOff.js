import * as React from "react";

function SvgCheckOff(props) {
  return (
    <svg width={30} height={30} {...props}>
      <defs>
        <radialGradient
          cx="41.692%"
          cy="37.355%"
          fx="41.692%"
          fy="37.355%"
          r="91.272%"
          gradientTransform="matrix(.7541 .62324 -.60098 .78203 .327 -.178)"
          id="check-off_svg__a"
        >
          <stop stopColor="#FFF" offset="0%" />
          <stop stopColor="#FFF" offset="28.096%" />
          <stop stopColor="#D6D6D6" offset="55.752%" />
          <stop stopColor="#989898" offset="100%" />
        </radialGradient>
      </defs>
      <rect
        width={28}
        height={27}
        rx={3}
        transform="translate(1 1)"
        fill="url(#check-off_svg__a)"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCheckOff;
