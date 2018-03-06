export const state = () => ({

  mainMenu: [
    {
      name: "activities",
      to: "/activities",
    },
    {
      name: "auth",
      to: "/auth",
    },
    {
      name: "help",
      to: "/help",
    },
    {
      name: "home",
      to: "/home",
    },
    {
      name: "resources",
      to: "/resources",
    },
    {
      name: "setup",
      to: "/setup",
    },
    {
      name: "test",
      to: "/test",
    },
    {
      name: "tools",
      to: "/tools",
    },
  ],

  activities: [
    {
      name: "",
      to: "/activities/home",
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
  ]

})
