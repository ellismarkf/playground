import React from 'react'

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


function leftPad(n) {
  return n < 10 ? `0${n}` : n.toString()
}

function checkLeapYear(year) {
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

function getDaysInMonth(month, year) {
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

function toInputString(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${year}-${leftPad(month)}-${leftPad(day)}`
}

/**
 * 
 * @param {Date} date 
 */
function getDateComponents(date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let dayOfWweek = date.getDay()
  let todayCopy = new Date()
  let firstDayOfMonth = new Date(todayCopy.setDate(1)).getDay()
  return {
    inputString: toInputString(date),
    year,
    day,
    firstDayOfMonth,
    dayOfWweek,
    month,
    daysInMonth: getDaysInMonth(month, year),
    today: date
  }
}

function Mainspring(props) {
  let today = new Date()
  return (
    <React.Fragment>
      {props.children(getDateComponents(today))}
    </React.Fragment>
  )
}

export default Mainspring