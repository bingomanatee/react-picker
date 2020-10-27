import * as React from "react";

function SvgRadioOff(props) {
  return (
    <svg width={24} height={24} {...props}>
      <circle
        cx={11}
        cy={11}
        r={10}
        transform="translate(0 1)"
        fill="#FFF"
        stroke="#D6D6D6"
        strokeWidth={2}
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgRadioOff;
