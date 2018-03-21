export default function ({store, route, redirect}) {

  // Set the location for redirect after authentication
  store.dispatch("nav/redirectAfterAuth", route.path)

  // if session is valid, do nothing
  if (store.getters["session/valid"]) {
    return
  }

  // Page may have been refreshed which clears the store - so try the token in local storage
  const t = localStorage.getItem("token")

  // Don't check a token with 'undefined' or 'null' as the value
  if (t && t.length > 50) {

    store.dispatch("session/start", t)
      .then(() => {
        if (!store.getters["session/valid"]) {
          console.log("Could not validate user session, redirecting to login page")
          return redirect("/auth/login")
        }
      })
      .catch((err) => {
        console.log("Something not right, redirect to login...")
        console.log(err)
        return redirect("/auth/login")
      })

  } else {
    console.log("No token, redirecting to login.")
    return redirect("/auth/login")
  }
}
