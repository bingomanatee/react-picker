import * as React from "react";

function SvgRadioOff(props) {
  return (
    <svg width={30} height={30} {...props}>
      <defs>
        <radialGradient
          cx="41.692%"
          cy="37.355%"
          fx="41.692%"
          fy="37.355%"
          r="93.279%"
          gradientTransform="matrix(.73787 .60983 -.56777 .79253 .321 -.177)"
          id="radio-off_svg__a"
        >
          <stop stopColor="#FFF" offset="0%" />
          <stop stopColor="#FFF" offset="28.096%" />
          <stop stopColor="#D6D6D6" offset="55.752%" />
          <stop stopColor="#989898" offset="100%" />
        </radialGradient>
      </defs>
      <ellipse
        cx={14.5}
        cy={13.5}
        rx={14.5}
        ry={13.5}
        transform="translate(0 1)"
        fill="url(#radio-off_svg__a)"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgRadioOff;
