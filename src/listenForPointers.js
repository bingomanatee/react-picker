const moveThreshold = 5;
const maxDuration = 4 * 1000;

export default (state) => {
  if (!document && document.addEventListener) {
    return;
  }

  const pointers = new Map();
  state.do.setListeningForPointers(true);

  const onPointerDown = (event) => {
    const { pointerId, clientX, clientY } = event;
    const newPointer = {
      clientX, clientY, pointerId, at: Date.now(),
    };
    pointers.set(pointerId, newPointer);

    setTimeout(() => pointers.delete(clientX), maxDuration);
  };

  const onPointerMove = (event) => {
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
  };

  const onPointerEnd = (event) => {
    const { pointerId } = event;

    const storedPointer = pointers.get(pointerId);
    if (storedPointer) {
      if (!storedPointer.dragging) {
        state.do.setDisplay(false);
      }
      pointers.delete(pointerId);
    }
  };

  document.addEventListener('pointerdown', onPointerDown, false);
  document.addEventListener('pointermove', onPointerMove, false);
  document.addEventListener('pointerup', onPointerEnd, false);

  // cancel listeners on state completion
  state.subscribe(() => {}, () => {},
    () => {
      document.removeEventListener('pointerDown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerend', onPointerEnd);
    });
};
