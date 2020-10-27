import * as React from "react";

function SvgCheckOn(props) {
  return (
    <svg width={24} height={24} {...props}>
      <g fill="none" fillRule="evenodd">
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
        />
        <path
          d="M23 7v2.114L11.494 20.619 7.96 17.084l.366-.367-5.872-5.87L5.99 7.31l5.871 5.87 9.872-9.87A5.974 5.974 0 0123 7z"
          fill="#335F00"
        />
      </g>
    </svg>
  );
}

export default SvgCheckOn;
