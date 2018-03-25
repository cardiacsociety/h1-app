<template>
  <div>
    <ais-index
      :app-id="Config.ALGOLIA_APP_ID"
      :api-key="Config.ALGOLIA_API_KEY"
      :index-name="Config.ALGOLIA_RESOURCES_INDEX"
      :query-parameters="{'page': page, 'snippetEllipsisText': '…'}"
    >
      <div class="field">
        <p class="control has-icons-left">
          <ais-input class="input is-large is-success" type="text" placeholder="search for..."></ais-input>
          <span class="icon is-small is-left"><i class="fa fa-search"></i></span>
        </p>
      </div>
      <div class="field">
        <p>
          <ais-stats/>
        </p>
      </div>
      <ais-results :stack="true">
        <template slot-scope="{ result }">
          <div class="box search-result">
            <h5 class="title is-5 is-marginless">
              <ais-highlight :result="result" attribute-name="name"></ais-highlight>
            </h5>

            <ActivityResourceModal
              :activityData="activityData(result)"
            >
              <template slot="open">
                <p class="subtitle is-6 is-italic has-text-grey-light">
                  <a @click="openResource(result.shortUrl)">{{ resourceLinkText(result) }}</a>
                </p>
              </template>
            </ActivityResourceModal>

            <ais-snippet :result="result" attribute-name="description"></ais-snippet>

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
      }
    },

    computed: {

      activityTypes() {
        return this.$store.state.activityTypes
      },
    },

    methods: {

      // create link test for a search result
      resourceLinkText(result) {

        let t = (result.sourceNameAbbrev ? result.sourceNameAbbrev +'. ' : '') +
          (result.sourcePubDate ? result.sourcePubDate : '') +
          (result.sourceVolume ? ';' + result.sourceVolume : '') +
          (result.sourceIssue ? '(' + result.sourceIssue + ')' : '') +
          (result.sourcePages ? ':' + result.sourcePages : '')

        if (t) {
          return t
        }

        // resort to the short link url
        return result.shortUrl
      },

      // create at least some of the activityData object to pass through to the activity form
      // 'result' is the search result object for a particular resource
      activityData(result) {
        return {
          description: result.name + "\\r\\n[" + this.resourceLinkText(result) + "]",
          typeId: this.defaultActivityTypeId,
        }
      },

      openResource(url) {
        window.open(url)
      },

      loadMore: function () {
        this.page++;
      },
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
</style>
