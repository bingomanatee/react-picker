const moveThreshold = 5;
const maxDuration = 4 * 1000;

export default (state) => {
  const pointers = new Map();
  state.do.setListeningForPointers(true);

  state.action('pointerDown', (state, event) => {
    const { pointerId, clientX, clientY } = event;
    pointers.set(pointerId, { clientX, clientY, at: Date.now() });
    setTimeout(() => pointers.delete(clientX), maxDuration);
  });

  state.action('pointerMove', (state, event) => {
    const { pointerId, clientX, clientY } = event;
    const storedPointer = pointers.get(pointerId);
    if ((!storedPointer)
        || (storedPointer.dragging)) {
      return;
    }

    const dx = Math.abs(clientX - storedPointer.clientX);
    const dy = Math.abs(clientY - storedPointer.clientY);

    if (Math.max(dx, dy) > moveThreshold) {
      storedPointer.dragging = true;
    }
  });

  state.action('pointerEnd', (state, event) => {
    const { pointerId } = event;

    const storedPointer = pointers.get(pointerId);
    if (storedPointer) {
      if (!storedPointer.dragging) {
        state.do.setDisplay(false);
      }
      pointers.delete(pointerId);
    }
  });

  if (document && document.addEventListener) {
    document.addEventListener('pointerDown', state.do.pointerDown, false);
    document.addEventListener('pointermove', state.do.pointerMove, false);
    document.addEventListener('pointerend', state.do.pointerEnd, false);
  }

  // cancel listeners on state completion
  state.subscribe(() => {}, () => {},
    () => {
      if (document && document.removeEventListener) {
        document.removeEventListener('pointerDown', state.do.pointerDown);
        document.removeEventListener('pointermove', state.do.pointerMove);
        document.removeEventListener('pointerend', state.do.pointerEnd);
      }
    });
};
