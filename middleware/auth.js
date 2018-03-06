export default function ({store, redirect}) {

  // if session is valid, do nothing
  console.log("[auth] Check store for valid session data...")
  if (store.getters["session/valid"]) {
    console.log("...found! Carry on.")
    return
  }

  // Page may have been refreshed which clears the store - so try the token in local storage
  console.log("...not found. Trying local storage...")
  const t = localStorage.getItem("token")

  if (t && t.length > 50) { // make sure we don't check a token with 'undefined' or 'null' as the value
    store.dispatch("session/start", t)
      .then(() => {
        console.log("Attempt to restart session with token from local storage and then validate...")
        if (store.getters["session/valid"]) {
          console.log("ok!")
        } else {
          console.log("Could not validate user session, redirect to login page")
          return redirect("/auth/login")
        }
      })
      .catch((err) => {
        console.log(err)
        console.log("Something not right, redirect to login...")
        return redirect("/auth/login")
      })

  } else {
    console.log("No token, redirect to login...")
    return redirect("/auth/login")
  }
}
