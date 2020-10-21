import * as React from "react";

function SvgRadioOn(props) {
  return (
    <svg width={30} height={30} {...props}>
      <defs>
        <radialGradient
          cx="41.692%"
          cy="37.355%"
          fx="41.692%"
          fy="37.355%"
          r="95.312%"
          gradientTransform="matrix(.72213 .59683 -.53714 .80237 .316 -.175)"
          id="radio-on_svg__a"
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
          r="97.074%"
          gradientTransform="matrix(.70903 .586 -.51274 .81032 .313 -.173)"
          id="radio-on_svg__b"
        >
          <stop stopColor="#FFF" offset="0%" />
          <stop stopColor="#FFF" offset="40.81%" />
          <stop stopColor="#989898" offset="100%" />
        </radialGradient>
      </defs>
      <g transform="translate(-306 -255)" fill="none" fillRule="evenodd">
        <ellipse
          cx={15}
          cy={13.5}
          rx={15}
          ry={13.5}
          transform="translate(306 256)"
          fill="url(#radio-on_svg__a)"
        />
        <ellipse
          fill="#7ED321"
          style={{
            mixBlendMode: "multiply",
          }}
          cx={321}
          cy={269.5}
          rx={15}
          ry={13.5}
        />
        <path
          d="M331.977 259.167c1.961 1.908 3.327 4.35 3.82 7.07l-13.746 13.744-5.444-5.444.03-.032-4.669-4.668 4.514-4.514 4.67 4.669z"
          fill="url(#radio-on_svg__b)"
        />
      </g>
    </svg>
  );
}

export default SvgRadioOn;
