import React from 'react';
import Mainspring, { months, weekdays } from './mainspring'
import './App.css';

const Debug = props => (
  <code>
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  </code>
)

function getFullMonth(daysInMonth) {
  let month = []
  for (let i = 0; i <= daysInMonth; i++) {

  }
}

function Calendar(props) {
  let {
    inputString,
    year,
    day,
    dayOfWeek,
    firstDayOfMonth,
    month,
    daysInMonth,
    today
  } = props
  const days = new Array(daysInMonth).fill(0)
  const weekRowCount = Math.ceil(daysInMonth / 7)
  return (
    <React.Fragment>
      <input type="date" value={inputString} />
      <div>
        {days.map((cell, index) => (
          <span className={index + 1 === day ? 'today' : ''}>{index + 1}</span>
        ))}
      </div>
      <Debug firstDayOfMonth={firstDayOfMonth} firstWeekdayOfMonth={weekdays[firstDayOfMonth].label} />
    </React.Fragment>
  )
}

function App() {
  return (
    <React.Fragment>
      <header className="App-header">
        <h2>Playground</h2>
      </header>
      <Mainspring>
        {Calendar}
      </Mainspring>
    </React.Fragment>
  );
}

export default App;
