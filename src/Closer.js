import React, { useEffect, useCallback, useRef } from 'react';

export default ({ onClose, children }) => {
  const ref = useRef(null);
  const escapeListener = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose && onClose();
    }
  }, []);
  const clickListener = useCallback(
    (e) => {
      if (!ref.current) return;

      if (!(ref.current.contains(e.target))) {
        let { target } = e;
        while (target) {
          if (target.nodeName === 'svg') return;
          if (target.dataset && target.dataset.closer) return;
          target = target.parentNode || target.parent;
        }
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    },
    [ref.current],
  );
  // Below is the 10 lines of code you need.
  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, []);
  return (
    <div
      dataCloser
      ref={ref}
    >
      {children}
    </div>
  );
};
