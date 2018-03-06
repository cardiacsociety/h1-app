<template>
  <div>
    <!--<app-session></app-session>-->
    <v-navigation-drawer
      v-model="drawer"
      app
      disable-route-watcher
    >
      <v-toolbar class="deep-orange">
        <!--provides space for top toolbar-->
      </v-toolbar>
      <v-list>

        <NavLink
          icon="home"
          :to="{name: 'home'}"
          exact
        >Home
        </NavLink>

        <!-- activities group -->
        <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
          <v-list-tile slot="item" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items"
                       v-bind:key="subItem.title"
                       :to="subItem.to"
                       :exact="subItem.exact"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <NavLink
          icon="search"
          :to="{name: 'resources'}"
        >Resources
        </NavLink>

        <NavLink
          icon="build"
          :to="{name: 'tools'}"
        >Tools
        </NavLink>

        <NavLink
          icon="settings"
          :to="{name: 'setup'}"
        >Setup
        </NavLink>

        <NavLink
          icon="help"
          :to="{name: 'help'}"
        >
          Help
        </NavLink>

        <NavLink
          v-if="loggedIn"
          icon="exit_to_app"
          :to="{name: 'logout', query: {from: currentPath}}"
        >Logout
        </NavLink>

      </v-list>
    </v-navigation-drawer>


    <v-toolbar fixed app :clipped-left="clipped" color="primary" dark>
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <HeartBeat/>
      <!--<v-icon class="session-monitor" :color="heartbeat.currentClr" @click="emitOpenSessionDialog">favorite</v-icon>-->
    </v-toolbar>
  </div>
</template>

<script>
  import NavLink from '~/components/Nav/NavLink'
  import Session from '~/components/Auth/Session'
  import HeartBeat from '~/components/Auth/HeartBeat'

  export default {

    components: {
      Session,
      NavLink,
      HeartBeat,
    },

    data() {
      return {
        clipped: true,
        fixed: true,
        drawer: false,
        items: [
          {
            title: 'Activity',
            icon: 'assessment',
            to: {name: 'activities'},
            items: [
              {
                title: 'Overview',
                to: {name: 'activities'},
                exact: true
              },
              // {
              //   title: 'List',
              //   to: {
              //     name: 'activitiesList',
              //     path: '/activities/list/'
              //   }
              // }
            ]
          }
        ],
      }
    },

    computed: {

      // This sets the title in the toolbar based on the route meta (see routes.js)
      title() {
        return this.$route.meta.title
      },

      // returns the current url for returning from a cancelled action
      currentPath() {
        return this.$route.path
      },

      loggedIn() {
        return Session.session
      }
    },

    methods: {
      toggleDrawer() {
        //console.log('toggleDrawer()')
        this.drawer = !this.drawer
      },
      closeDrawer() {
        //console.log('closeDrawer()')
        this.drawer = false
      },
      openDrawer() {
        //console.log('openDrawer()')
        this.drawer = true
      },

      emitOpenSessionDialog() {
        this.$emit('openSessionDialog')
      }
    },

    mounted() {

      this.$on('navEvent', (opt) => {
        if (opt === 'close') {
          this.closeDrawer()
          return
        }
        if (opt === 'open') {
          this.openDrawer()
          return
        }
        if (opt === 'toggle') {
          this.toggleDrawer()
          return
        }

      })
    }
  }
</script>


<style scoped>
  .session-monitor:hover {
    cursor: pointer;
  }
</style>
