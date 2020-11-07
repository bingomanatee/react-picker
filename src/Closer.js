import React, { useEffect, useCallback, useRef } from 'react';

export default ({ store, children }) => {
  const ref = useRef(null);

  const close = useCallback(() => {
    if (store.my.display) {
      store.do.setDisplay(false);
    }
  });

  const escapeListener = useCallback((e) => {
    if (e.key === 'Escape') {
      close();
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

        close();
      }
    },
    [ref.current],
  );
  // Below is the 10 lines of code you need.
  useEffect(() => {
    setTimeout(() => {
      // Attach the listeners on component mount.
      document.addEventListener('click', clickListener);
      document.addEventListener('keyup', escapeListener);
      // Detach the listeners on component unmount.
    }, 500);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, []);

  return (
    <div
      data-closer
      ref={ref}
    >
      {children}
    </div>
  );
};
