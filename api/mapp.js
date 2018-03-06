import Config from '../config'
import Vue from 'vue'

// import VueResource from 'vue-resource'
// Vue.use(VueResource)
// Vue.http.options.root = Config.REST_API_BASE_URL
//
// import VueLocalStorage from 'vue-localstorage'
// Vue.use(VueLocalStorage)
//
// // interceptors (middleware)
// Vue.http.interceptors.push((request, next) => {
//   // Add JWT to all requests, if not required, eg for auth, then an empty string will be ok
//   request.headers.set('Authorization', 'Bearer ' + Vue.localStorage.get('appToken'))
//   next()
// })


export default {

  // auth POSTs login to api, returns a promise
  // auth(login, password) {
  //   const auth = {login, password} // post body
  //   return Vue.http.post('auth/member', auth)
  // },
  //
  // // refreshToken GETs a new token, returns a promise
  // refreshToken() {
  //   return Vue.http.get('m/token')
  // },
  //
  // // get a list of activity TYPES
  // getActivityTypes() {
  //   console.log("API called to fetch activity types")
  //   return Vue.http.get('g/activities')
  // },
  //
  // // Add a member activity record, activity is an object:
  // //  {
  // //    "activityId": 1, (the activity TYPE id)
  // //    "date": "2017-04-24",
  // //    "quantity": 1,
  // //    "description": "The description of the activity..."
  // //  }
  // addActivity(activity) {
  //   return Vue.http.post('m/activities', activity)
  // },
  // updateActivity(activity) {
  //   return Vue.http.put(`m/activities/${activity.id}`, activity)
  // },
  //
  // // fetch all activities for the user
  // // todo need to make this an auto scrolling list
  // getMemberActivities() {
  //   return Vue.http.get('m/activities')
  // }

}
