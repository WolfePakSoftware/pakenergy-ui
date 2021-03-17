import React, { useEffect, useReducer } from 'react';
import { DraggableModalContext } from './DraggableModalContext';
import { getWindowSize } from './utils';
import {
  draggableModalReducer,
  initialModalsState
} from './draggableModalReducer';

export const VDraggableModalProvider = ({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [state, dispatch] = useReducer(
    draggableModalReducer,
    initialModalsState
  );

  useEffect(() => {
    if (typeof window !== 'object') {
      return;
    }
    const onResize = (): void =>
      dispatch({ type: 'windowResize', size: getWindowSize() });
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [dispatch]);

  return (
    <DraggableModalContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </DraggableModalContext.Provider>
  );
};
