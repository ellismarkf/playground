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

function positionDays(firstDayOfMonth, daysInMonth) {
  const grid = new Array(35).fill(0)
  let day = firstDayOfMonth
  let dayDiff = 0
  return grid.map((_, index) => {
    if (index < day) {
      dayDiff++
      return ''
    }
    if (index >= daysInMonth + dayDiff) return ''
    return `${(index + 1) - dayDiff}`
  })
}

function Calendar(props) {
  let {
    date,
    inputString,
    year,
    day,
    dayOfWeek,
    firstDayOfMonth,
    month,
    daysInMonth,
    today,
    setDate,
    selectedDate,
    setSelectedDate
  } = props
  const grid = positionDays(firstDayOfMonth, daysInMonth)
  return (
    <React.Fragment>
      <input type="date" value={inputString} />
      <div className="calendar-container">
        <p>{months[month].label} {year}</p>
        <div className="day-grid">
          {grid.map((d, index) => {
            return (
              <span onClick={e => {
                if (d) {
                  const draftDate = new Date(date)
                  draftDate.setDate(d)
                  setSelectedDate(draftDate)
                }

              }} key={index} className={Number(d) === selectedDate.getDate() ? 'today' : ''}>
                {d}
              </span>
            )}
          )}
        </div>
        <button
          onClick={e => {
            const newDate = new Date(today)
            newDate.setMonth(newDate.getMonth() - 1)
            setDate(newDate)
          }}
        >
          {'<-'}
        </button>
        <button
          onClick={e => {
            const newDate = new Date(today)
            newDate.setMonth(newDate.getMonth() + 1)
            console.log(newDate)
            setDate(newDate)
          }}
        >
          {'->'}
        </button>
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
