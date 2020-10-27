import * as React from "react";

function SvgCheckOff(props) {
  return (
    <svg width={24} height={24} {...props}>
      <rect
        x={1}
        y={1}
        width={20}
        height={20}
        rx={6}
        transform="translate(1 1)"
        fill="#FFF"
        stroke="#D6D6D6"
        strokeWidth={2}
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCheckOff;
