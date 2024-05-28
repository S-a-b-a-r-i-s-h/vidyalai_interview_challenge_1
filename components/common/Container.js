import React from 'react';
import { useWindowWidthContext } from '../hooks/WindowWidthContext';

export default function Container({ children }) {
  const { isSmallerDevice } = useWindowWidthContext();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}
