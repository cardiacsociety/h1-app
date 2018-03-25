export const state = () => ({

  // Set by auth middleware to route.path so can redirect user after auth
  authRedirect: "/",

  mainMenu: [
    {
      name: "activities",
      to: "/activities",
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
      name: "",
      to: "/activities/home/overview",
      iconClass: "fa fa-home",
      subsubnav: [
        {
          name: "overview",
          to: "/activities/home/overview",
        },
      ],
    },
    {
      name: "record",
      to: "/activities/record",
      iconClass: "fa fa-edit",
      subsubnav: [
        {name: "new", to: "/activities/record/new"},
        {name: "recurring", to: "/activities/record/recurring"},
      ],
    },
    {
      name: "history",
      to: "/activities/history",
      iconClass: "fa fa-history",
      subsubnav: [
        {name: "all", to: "/activities/history/all"},
        {name: "report", to: "/activities/history/report"},
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
