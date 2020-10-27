import * as React from "react";

function SvgRadioOn(props) {
  return (
    <svg width={24} height={24} {...props}>
      <g fill="none" fillRule="evenodd">
        <circle
          cx={11}
          cy={11}
          r={10}
          transform="translate(1 1)"
          fill="#FFF"
          stroke="#D6D6D6"
          strokeWidth={2}
        />
        <path
          d="M20.734 5.311a10.947 10.947 0 012.128 4.942L11.495 21.619 7.96 18.084l.366-.367-5.872-5.87L5.99 8.31l5.871 5.87z"
          fill="#417505"
        />
      </g>
    </svg>
  );
}

export default SvgRadioOn;
