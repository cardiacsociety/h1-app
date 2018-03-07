export const state = () => ({

  mainMenu: [
    {
      name: "activities",
      to: "/activities/home/overview",
    },
    {
      name: "resources",
      to: "/resources/library/search",
    },
    {
      name: "setup",
      to: "/setup/home",
    },
    {
      name: "tools",
      to: "/tools",
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
        {
          name: "new",
          to: "/activities/home/new"
        },
      ],
    },
    {
      name: "test",
      to: "/activities/test",
      iconClass: "fa fa-image",
      subsubnav: [
        {name: "one", to: "/activities/test/one"},
        {name: "two", to: "/activities/test/two"},
        {name: "three", to: "/activities/test/three"},
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
        {name: "latest", to: "/resources/library/latest"},
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
