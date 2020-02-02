import React from 'react'
import { useMachine } from '@xstate/react'
import { dataMachine } from '../../machines/dataMachine'
export default function DataFetcher() {
  const [current, send] = useMachine(dataMachine)
  const { data } = current.context
  return (
    <div>
      <ul className="list-group">
        {data.map(row => (
          <li className="list-group-item" key={row} style={{ background: 'orange' }}>
            {row}
          </li>
        ))}

        {current.matches('loading') && <li className="list-group-item">loading...</li>}

        {current.matches('more') && <li style={{ background: 'green' }}>
          <button onClick={() => { send('LOAD') }}>load more</button>
        </li>}
      </ul>
    </div>
  )
}
