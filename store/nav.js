export const state = () => ({

  // Set by auth middleware to route.path so can redirect user after auth
  authRedirect: "/",

  mainMenu: [
    {
      name: "activity",
      to: "/activity",
    },
    {
      name: "resources",
      to: "/resources",
    },
    {
      name: "setup",
      to: "/setup/home",
    },
    {
      name: "help",
      to: "/help",
    },
  ],

  activities: [
    {
      name: "list",
      to: "/activity/list",
      iconClass: "fas fa-list",
    },
    {
      name: "report",
      to: "/activity/report",
      iconClass: "fas fa-chart-bar",
      subsubnav: [
        {name: "current", to: "/activity/report/current"},
        {name: "all", to: "/activity/report/all"},
      ],
    },
  ],

  resources: [
    {
      name: "library",
      to: "/resources/library",
      iconClass: "",
      subsubnav: [
        {name: "search", to: "/resources/library/search"},
      ],
    },
    {
      name: "tools",
      to: "/resources/tools",
      subsubnav: [
        {name: "calculators", to: "/resources/tools/calculators"},
      ],
    },
    {
      name: "directory",
      to: "/resources/directory",
      subsubnav: [
        {name: "search", to: "/resources/directory/search"},
      ],
    },
  ],

  setup: [
    {
      name: "",
      to: "/setup/home",
      iconClass: "fa fa-home",
    },
    {
      name: "CPD",
      to: "/setup/cpd",
      iconClass: "",
    },
    {
      name: "profile",
      to: "/setup/profile",
      iconClass: "",
    },
  ]
})

export const mutations = {

  setAuthRedirect(state, path) {
    state.authRedirect = path
  }
}

export const actions = {

  redirectAfterAuth({commit}, path) {
    commit("setAuthRedirect", path)
  }
}
