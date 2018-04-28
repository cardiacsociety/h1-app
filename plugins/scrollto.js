import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

const options = {
  duration: 1000,
  offset: -120,
}

Vue.use(VueScrollTo, options)

// You can also pass in the default options
// Vue.use(VueScrollTo, {
//   container: "body",
//   duration: 500,
//   easing: "ease",
//   offset: 0,
//   cancelable: true,
//   onStart: false,
//   onDone: false,
//   onCancel: false,
//   x: false,
//   y: true
// })