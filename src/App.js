import React from 'react';
import Daystream, { getDaysInMonth, toInputString, getSixWeekView } from './daystream'
import './App.css';

const Debug = props => (
  <code>
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  </code>
)

function SixWeekView(props) {
  let {
    date,
    month,
    selectedDate,
    setDate,
    setSelectedDate
  } = props
  const { days, overflow } = getSixWeekView(
    month.totalDays,
    getDaysInMonth(month.index - 1),
    month.firstDayIndex
  )
  return (
    <div className="calendar-container">
      <p>{month.label} {month.year}</p>
      <div className="day-grid">
        {overflow.prev.map((d, index) => (
          <span
            onClick={() => {
              const draftDate = new Date(date)
              draftDate.setDate(d)
              draftDate.setMonth(date.getMonth() - 1)
              setDate(draftDate)
              setSelectedDate(draftDate)
            }}
            key={index}
            className={` out-of-bounds`}>
            {d}
          </span>
        ))}
        {days.map((d, index) => {
          const isSelectedDate = d === selectedDate.getDate() && month.index === selectedDate.getMonth() && month.year === selectedDate.getFullYear()
          return (
            <span
              onClick={() => {
                const draftDate = new Date(date)
                draftDate.setDate(d)
                setDate(draftDate)
                setSelectedDate(draftDate)
              }}
              key={index}
              className={`${isSelectedDate ? 'today' : ''}`}
            >
              {d}
            </span>
          )
        }
        )}
        {overflow.next.map((d, index) => (
          <span
            key={index}
            className={`out-of-bounds`}
            onClick={() => {
              const draftDate = new Date(date)
              draftDate.setDate(d)
              draftDate.setMonth(date.getMonth() + 1)
              setDate(draftDate)
              setSelectedDate(draftDate)
            }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}

function getMonthDate(date, month) {
  const draft = new Date(date)
  switch ((date.getMonth() - month)) {
    case -1: return draft.setMonth(date.getMonth() + 1)
    case 1: return draft.setMonth(date.getMonth() - 1)
    default: return date
  }
}

/**
 * 
 * @param {import('./daystream').DaystreamProps} props 
 */
function Calendar(props) {
  let {
    date,
    setDate,
    selectedDate,
    setSelectedDate,
    currentMonth,
    setNextMonth,
    setNextYear,
    setPreviousMonth,
    setPreviousYear,
    setToday,
    checkDaySelected,
    checkWithinRange
  } = props
  const { days, overflow } = getSixWeekView(
    currentMonth.totalDays,
    getDaysInMonth(currentMonth.index - 1),
    currentMonth.firstDayIndex
  )
  const months = [
    currentMonth
  ]

  return (
    <React.Fragment>
      <input type="date" value={toInputString(selectedDate)} />
      <div className="months-container">
        <div className="calendar-container">
          <p>{currentMonth.label} {currentMonth.year}</p>
          <div className="day-grid">
            {overflow.prev.map((d, index) => (
              <span
                onClick={() => {
                  const draftDate = new Date(date)
                  draftDate.setDate(d)
                  draftDate.setMonth(date.getMonth() - 1)
                  setDate(draftDate)
                  setSelectedDate(draftDate)
                }}
                key={index}
                className={` out-of-bounds`}>
                {d}
              </span>
            ))}
            {days.map((day, index) => {
              const isSelectedDate = checkDaySelected(day)
              const isWithinRange = checkWithinRange(day)
              return (
                <span
                  onClick={() => {
                    const draftDate = new Date(date)
                    draftDate.setDate(day)
                    setDate(draftDate)
                    setSelectedDate(draftDate)
                  }}
                  key={index}
                  className={`${isSelectedDate ? 'today' : ''}`}
                >
                  {day}
                </span>
              )
            }
            )}
            {overflow.next.map((d, index) => (
              <span
                key={index}
                className={`out-of-bounds`}
                onClick={() => {
                  const draftDate = new Date(date)
                  draftDate.setDate(d)
                  draftDate.setMonth(date.getMonth() + 1)
                  setDate(draftDate)
                  setSelectedDate(draftDate)
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="controls-container">
        <button onClick={setPreviousYear}>
          {'<<'}
        </button>
        <button onClick={setPreviousMonth}>
          {'<'}
        </button>
        <button onClick={setToday}>Today</button>
        <button onClick={setNextMonth}>
          {'>'}
        </button>
        <button onClick={setNextYear}>
          {'>>'}
        </button>
      </div>
    </React.Fragment>
  )
}

function App() {
  return (
    <React.Fragment>
      <header className="App-header">
        <h2>Playground</h2>
      </header>
      <Daystream>
        {Calendar}
      </Daystream>
    </React.Fragment>
  );
}

export default App;
