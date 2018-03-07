export const state = () => ({

  mainMenu: [
    {
      name: "activities",
      to: "/activities/home/overview",
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
  ]

})
