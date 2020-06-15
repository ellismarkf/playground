import React, { useState } from 'react'

/**
 * @typedef {Object} CurrentMonth
 * @property {number} firstDayIndex
 * @property {number} firstDayDate
 * @property {number} totalDays
 * @property {number} index
 * @property {number} currentYear
 * @property {string} label
 */

/**
 * @typedef {Object} DaystreamProps
 * @property {function} setDate
 * @property {function} setSelectedDate
 * @property {function} setNextMonth
 * @property {function} setNextYear
 * @property {function} setPreviousMonth
 * @property {function} setPreviousYear
 * @property {function} setToday
 * @property {function} getSixWeekView
 * @property {function} getNextMonth
 * @property {function} getPreviousMonth
 * @property {CurrentMonth} currentMonth
 * @property {string} inputString
 * @property {number} year
 * @property {number} day
 * @property {number} firstDayOfMonth
 * @property {number} dayOfWeek
 * @property {number} month
 * @property {number} daysInMonth
 * @property {Date} date
 */

/**
 * @typedef {object} SixWeekView
 * @property {number[]} days
 * @property {object} overflow
 * @property {number[]} overflow.next
 * @property {number[]} overflow.prev
 */

export const CLOSED = 0
export const OPEN = 1

export const jan =  0
export const feb =  1
export const mar =  2 
export const apr =  3
export const may =  4
export const jun =  5
export const jul =  6
export const aug =  7
export const sep =  8
export const oct =  9
export const nov =  10
export const dec =  11

export const sun = 0
export const mon = 1
export const tue = 2
export const wed = 3
export const thu = 4
export const fri = 5
export const sat = 6

export const months = {
  [jan]: { index: 0, label: 'January'},
  [feb]: { index: 1, label: 'February'},
  [mar]: { index: 2, label: 'March'},
  [apr]: { index: 3, label: 'April'},
  [may]: { index: 4, label: 'May'},
  [jun]: { index: 5, label: 'June'},
  [jul]: { index: 6, label: 'July'},
  [aug]: { index: 7, label: 'August'},
  [sep]: { index: 8, label: 'September'},
  [oct]: { index: 9, label: 'October'},
  [nov]: { index: 10, label: 'November'},
  [dec]: { index: 11, label: 'December'}
}

export const weekdays = {
  [sun]: {label: 'Sunday', index: 0},
  [mon]: {label: 'Monday', index: 1},
  [tue]: {label: 'Tuesday', index: 2},
  [wed]: {label: 'Wednesday', index: 3},
  [thu]: {label: 'Thursday', index: 4},
  [fri]: {label: 'Friday', index: 5},
  [sat]: {label: 'Saturday', index: 6},
}


export function leftPad(n) {
  return n < 10 ? `0${n}` : n.toString()
}

export function checkLeapYear(year) {
  // year is multiple of 4 (except for years evenly divisible by 100, which are not leap years unless evenly divisible by 400)
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      return year % 400 === 0
    } else {
      return true
    }
  } else {
    return false
  }
}

export function getDaysInMonth(month, year) {
  switch (month) {
    case feb:
      return checkLeapYear(year) ? 29 : 28
    case jan:
    case mar:
    case may:
    case jul:
    case aug:
    case oct:
    case dec:
      return 31
    default:
      return 30
  }
}

export function toInputString(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${year}-${leftPad(month)}-${leftPad(day)}`
}

/**
 * 
 * @param {Date} date 
 */
export function getCurrentDateStats(date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let dayOfWeek = date.getDay()
  let draftDate = new Date(date)
  let firstDayOfMonth = new Date(draftDate.setDate(1))
  return {
    inputString: toInputString(date),
    year,
    day,
    firstDayOfMonth: firstDayOfMonth.getDay(),
    dayOfWeek,
    month,
    daysInMonth: getDaysInMonth(month, year),
    date
  }
}

/**
 * 
 * @param {Date} date 
 * @returns {CurrentMonth}
 */
export function getMonthStats(date){
  let currentYear = date.getFullYear()
  let currentMonth = date.getMonth()
  let draftDate = new Date(date)
  let firstDayOfMonth = new Date(draftDate.setDate(1))
  return {
    firstDayIndex: firstDayOfMonth.getDay(),
    firstDayDate: firstDayOfMonth.getDate(),
    totalDays: getDaysInMonth(currentMonth, currentYear),
    index: currentMonth,
    label: months[currentMonth].label,
    year: currentYear
  }
}

/**
 * 
 * @param {Date} date 
 */
export function getCurrentMonthStats(date) {
  const nextMonth = new Date(date)
  nextMonth.setMonth(date.getMonth() + 1)
  const previousMonth = new Date(date)
  previousMonth.setMonth(date.getMonth() - 1)
  return {
    currentMonth: {
      ...getMonthStats(date)
    },
    getNextMonth() {
      return getMonthStats(nextMonth)
    },
    getPreviousMonth() {
      return getMonthStats(previousMonth)
    }
  }
}

/**
 * 
 * @param {number} daysInMonth 
 * @param {number} daysLastMonth 
 * @param {number} firstDayIndex
 * @return {SixWeekView}
 */
export function getSixWeekView(daysInMonth, daysLastMonth, firstDayIndex = 0) {
  const days = new Array(daysInMonth).fill(0).map((_, i) => i + 1)
  let lastMonthStart = daysLastMonth - firstDayIndex
  const overflowPrev = new Array(daysLastMonth - (lastMonthStart)).fill((lastMonthStart)).map((d, i) => d + i + 1)
  const overflowNext = new Array(42 - (daysInMonth + overflowPrev.length)).fill(0).map((_, i) => i + 1)
  return {
    days,
    overflow: {
      prev: overflowPrev,
      next: overflowNext
    }
  }
}

function Daystream(props) {
  const today = new Date()
  const [date, setDate] = useState(props.initialDate ? props.initialDate : new Date())
  const [selectedDate, setSelectedDate] = useState(props.initialDate ? props.initialDate : new Date())
  const [inputState, setInputState] = useState(CLOSED)
  const [rangeStart, setRangeStart] = useState(props.rangeStart ? props.rangeStart : null)
  const [rangeEnd, setRangeEnd] = useState(props.rangeEnd ? props.rangeEnd : null)
  const currentMonth = getCurrentMonthStats(date)
  function setPreviousMonth() {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() - 1)
    setDate(newDate)
  }
  function setNextMonth() {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + 1)
    setDate(newDate)
  }
  function setPreviousYear() {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() - 1)
    setDate(newDate)
  }
  function setNextYear() {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() + 1)
    setDate(newDate)
  }
  function setToday() {
    setDate(today)
    setSelectedDate(today)
  }
  function checkDaySelected(day) {
    return day === selectedDate.getDate() && currentMonth.index === selectedDate.getMonth() && currentMonth.year === selectedDate.getFullYear()
  }
  function checkWithinRange(day) {
    if (!rangeStart || !rangeEnd) return false
    
  }
  return (
    <React.Fragment>
      {props.children({
        getSixWeekView,
        ...getCurrentDateStats(date),
        ...currentMonth,
        setDate,
        selectedDate,
        setSelectedDate,
        setNextMonth,
        setNextYear,
        setPreviousMonth,
        setPreviousYear,
        today,
        setToday,
        inputState,
        setInputState,
        rangeStart,
        setRangeStart,
        rangeEnd,
        setRangeEnd,
        checkDaySelected,
        checkWithinRange
      })}
    </React.Fragment>
  )
}



export default Daystream