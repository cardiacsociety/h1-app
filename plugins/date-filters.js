import Vue from 'vue'

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dateFilter = value => {
  return formatDate(value)
}

function formatDate(inputDate) {
  const d = new Date(inputDate)
  const year = d.getFullYear()
  const month = d.getMonth()
  const date = d.getDate()

  return `${date} ${months[month]} ${year}`
}

Vue.filter('formatDate', dateFilter)
