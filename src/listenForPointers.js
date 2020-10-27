const moveThreshold = 5;
const maxDuration = 4 * 1000;

export default (state) => {
  if (!document && document.addEventListener) {
    console.log('cannot listen for events - no document');
    return;
  }
  console.log('listening for pointer events: ', state);

  const pointers = new Map();
  state.do.setListeningForPointers(true);

  const onPointerDown = (event) => {
    const { pointerId, clientX, clientY } = event;
    const newPointer = {
      clientX, clientY, pointerId, at: Date.now(),
    };
    pointers.set(pointerId, newPointer);
    console.log('created', newPointer);

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
    console.log('moved ', dx, dy, 'for pointer ', storedPointer);

    if (Math.max(dx, dy) > moveThreshold) {
      storedPointer.dragging = true;
    }
  };

  const onPointerEnd = (state, event) => {
    const { pointerId } = event;

    const storedPointer = pointers.get(pointerId);
    if (storedPointer) {
      if (!storedPointer.dragging) {
        console.log('closing because of pointer end: ', storedPointer);
        state.do.setDisplay(false);
      }
      pointers.delete(pointerId);
    }
  };

  document.addEventListener('pointerDown', onPointerDown, false);
  document.addEventListener('pointermove', onPointerMove, false);
  document.addEventListener('pointerend', onPointerEnd, false);

  // cancel listeners on state completion
  state.subscribe(() => {}, () => {},
    () => {
      document.removeEventListener('pointerDown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerend', onPointerEnd);
    });
};
