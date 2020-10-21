import * as React from "react";

function SvgCheckOn(props) {
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
          id="check-on_svg__a"
        >
          <stop stopColor="#FFF" offset="0%" />
          <stop stopColor="#FFF" offset="28.096%" />
          <stop stopColor="#D6D6D6" offset="55.752%" />
          <stop stopColor="#989898" offset="100%" />
        </radialGradient>
        <radialGradient
          cx="41.692%"
          cy="37.355%"
          fx="41.692%"
          fy="37.355%"
          r="91.329%"
          gradientTransform="scale(.96329 1) rotate(38.524 .425 .396)"
          id="check-on_svg__b"
        >
          <stop stopColor="#FFF" offset="0%" />
          <stop stopColor="#FFF" offset="28.096%" />
          <stop stopColor="#D6D6D6" offset="55.752%" />
          <stop stopColor="#989898" offset="100%" />
        </radialGradient>
      </defs>
      <g transform="translate(-306 -288)" fill="none" fillRule="evenodd">
        <rect
          width={28}
          height={27}
          rx={3}
          transform="translate(307 289)"
          fill="url(#check-on_svg__a)"
        />
        <rect
          fill="#7ED321"
          style={{
            mixBlendMode: "multiply",
          }}
          x={307}
          y={289}
          width={28}
          height={27}
          rx={3}
        />
        <path
          d="M335 292v6.528l-13.463 13.463-5.444-5.444.03-.032-4.669-4.668 4.514-4.514 4.67 4.669 12.691-12.692A3 3 0 01335 292z"
          fill="url(#check-on_svg__b)"
        />
      </g>
    </svg>
  );
}

export default SvgCheckOn;
