export default function ({ store, redirect}) {
  if (!store.getters["session/valid"]) {
    return redirect("/auth/login")
  }
}
