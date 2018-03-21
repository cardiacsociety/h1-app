import Vue from 'vue'

const round0 = value => {
  return roundNumber(value, 0)
}

const round1 = value => {
  return roundNumber(value, 1)
}

const round2 = value => {
  return roundNumber(value, 2)
}

const round3 = value => {
  return roundNumber(value, 3)
}

const round4 = value => {
  return roundNumber(value, 4)
}

const roundNumber = (num, places) => {
  return num.toFixed(places)
}

Vue.filter('round0', round0)
Vue.filter('round1', round1)
Vue.filter('round2', round2)
Vue.filter('round3', round3)
Vue.filter('round4', round4)
