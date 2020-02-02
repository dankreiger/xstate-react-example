import React from 'react'
import { useMachine } from '@xstate/react';
import { toggleMachine } from '../../machines/toggleMachine';

export default function Toggler() {
  const [current, send] = useMachine(toggleMachine);
  return (
    <div>
      <button
      className="btn"
        onClick={() => {
          send('TOGGLE');
        }}
      >
        Toggle
      </button>
      {current.matches('active') && <span>We are active</span>}
      {current.matches('inactive') && <span>We are inactive</span>}
    </div>
  )
}
