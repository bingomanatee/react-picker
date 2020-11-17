import React from 'react';

const snuff = (event) => {
  try {
    if (!event) return;
    if (event.stopPropogation) event.stopPropogation();
    if (event.preventDefault) event.preventDefault();
    if (event.nativeEvent) {
      snuff(event.nativeEvent);
    }
  } catch (err) {
    console.log('snuff error: ', err);
  }
};

export default ({ children }) => (
  <span
    onClick={snuff}
    onMouseDown={snuff}
    onMouseUp={snuff}
    onMouseLeave={snuff}
    onMouseMove={snuff}
    onKeyDown={snuff}
    onKeyUp={snuff}
    onPointerDown={snuff}
    onPointerMove={snuff}
    onPointerLeave={snuff}
  >
    {children}
  </span>
);
