<template>
  <div>
    <ais-index
      :app-id="Config.ALGOLIA_APP_ID"
      :api-key="Config.ALGOLIA_API_KEY"
      :index-name="Config.ALGOLIA_MEMBERS_INDEX"
      :auto-search="false"
      :query-parameters="{
        'page': page,
      }"
    >
      <div class="field">
        <p class="control has-icons-left">
          <ais-input class="input is-large is-success" type="text"
                     placeholder="search by name, location, interest..."
                     autofocus
          ></ais-input>
          <span class="icon is-small is-left"><i class="fa fa-search"></i></span>
        </p>
      </div>
      <div class="hidden">
        <ais-stats>
          <template slot-scope="{query}">
            {{ searchString = query }}
          </template>
        </ais-stats>
      </div>
        <ais-results :stack="true">
          <template slot-scope="{ result }">
            <div class="box search-result" v-if="searchString">
              <h5 class="title is-5 is-marginless">
                <ais-highlight :result="result" attribute-name="name"/>
              </h5>
              <p class="subtitle is-7 is-marginless" v-html="result._highlightResult.membership.value"></p>
              <div v-html="result._highlightResult.location.value"></div>
              <div v-if="checkEmail(result.email)"><a :href="'mailto:'+result.email">{{ result.email }}</a></div>
              <div v-if="result.mobile"><a :href="'tel://'+result.mobile">{{ result.mobile }}</a></div>
              <div v-if="result.specialities" v-html="highlightList(result._highlightResult.specialities)"></div>
              <div v-if="result.affiliations" v-html="highlightList(result._highlightResult.affiliations)"></div>
            </div>
          </template>
        </ais-results>

      <div id="loadmore"></div>

    </ais-index>
  </div>
</template>

<script>
  import Config from '~/config'
  import ScrollMonitor from 'scrollmonitor'
  import ActivityResourceModal from '~/components/Activity/ActivityResourceModal'

  export default {

    components: {
      ActivityResourceModal,
    },


    data() {
      return {
        Config,
        page: 1,
        // solo reading is the most likely :)
        defaultActivityTypeId: 32,

        searchString: "",
      }
    },


    methods: {
      loadMore: function () {
        this.page++;
      },

      // Returns false if email matches certain strings in config
      // App requires an email for login, some users are given an invalid email address just for login, so this
      // will exclude those.
      checkEmail(email) {
        if (email.length < 4) {
          return false
        }

        const exclude = Config.INVALID_EMAIL_STRINGS.split(",")
        let r = true
        exclude.forEach(e => {
          if (email.includes(e)) {
            r = false
          }
        })

        return r
      },

      // Creates a comma separated list from the highlighted result objects
      highlightList(items) {
        let a = []
        items.forEach(i => {
          a.push(i.value)
        })
        return a.join(", ")
      }

    },

    mounted() {
      let e = document.getElementById('loadmore')
      let w = ScrollMonitor.create(e)
      w.enterViewport(() => {
        this.loadMore()
      })
    }

  }
</script>

<style scoped>
  .highlight-terms em {
    font-style: normal;
  }

  .hidden {
    display: none;
  }
</style>
