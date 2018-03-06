<template>
  <div>
    <NavBar/>
    <section class="hero is-primary is-small">
      <div class="hero-head"></div>
      <div class="hero-body">
        <div class="container">
          <p class="title is-4">{{ title }}</p>
          <p class="subtitle is-6">{{ subtitle }}</p>
        </div>
      </div>
      <div class="hero-foot" v-if="subnav">
        <div class="container">
          <nav class="tabs is-boxed">
            <ul>
              <template v-for="item,index in subnav">
                <nuxt-link
                  :to="item.to"
                  active-class="is-active"
                  tag="li"
                >
                  <template v-if="!item.name && item.iconClass">
                    <a>
                      <span>&nbsp;</span>
                      <span class="icon is-small"><i :class="item.iconClass"></i></span>
                      <span>&nbsp;</span>
                    </a>
                  </template>
                  <template v-if="item.name && item.iconClass">
                    <a>
                      <span class="icon is-small"><i :class="item.iconClass"></i></span>
                      <span>{{ item.name }}</span>
                    </a>
                  </template>
                  <template v-if="item.name && !item.iconClass">
                    <a>{{ item.name }}</a>
                  </template>
                </nuxt-link>
              </template>
            </ul>
          </nav>
        </div>
      </div>
    </section>
    <nav class="navbar has-shadow" v-if="subSubNav">
      <div class="container">
        <div class="navbar-tabs">
          <template v-for="item,index in subSubNav">
            <nuxt-link
              :to="item.to"
              class="navbar-item is-tab"
              active-class="is-active"
            >
              <template v-if="!item.name && item.iconClass">
                <a>
                  <span>&nbsp;</span>
                  <span class="icon is-small"><i :class="item.iconClass"></i></span>
                  <span>&nbsp;</span>
                </a>
              </template>
              <template v-if="item.name && item.iconClass">
                <a>
                  <span class="icon is-small"><i :class="item.iconClass"></i></span>
                  <span>{{ item.name }}</span>
                </a>
              </template>
              <template v-if="item.name && !item.iconClass">
                <a>{{ item.name }}</a>
              </template>
            </nuxt-link>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>

  import NavBar from '~/components/Nav/NavBar'

  export default {
    name: "PageHeader",

    components: {
      NavBar,
    },

    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: false,
      },
      subnav: {
        type: Array,
        required: false,
      },
    },

    computed: {
      subSubNav() {

        if (!this.subnav) {
          return false;
        }

        let ssn = []
        this.subnav.forEach((item) => {
          const parentPath = this.$route.path.substring(0, item.to.length)
          if (parentPath == item.to) {
            ssn = item.subsubnav
          }
        })

        return ssn
      }
    },
  }
</script>

<style scoped>
</style>
