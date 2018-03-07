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
              <h5 class="title is-5">
                <ais-highlight :result="result" attribute-name="name"></ais-highlight>
              </h5>
              <p class="subtitle is-6 is-italic has-text-grey-light">
                <a :href="result.shortUrl" target="_blank">{{ resourceLinkText(result) }}</a>
              </p>
            <ais-snippet :result="result" attribute-name="description"></ais-snippet>
            <!--<div>-->
            <!--<app-activity-form-->
            <!--:activityTypesData="activityTypes"-->
            <!--:activityData="{description: result.name + '\r\n' + result.shortUrl}"-->
            <!--&gt;-->
            <!--<v-btn-->
            <!--slot="activator"-->
            <!--class="resource-link"-->
            <!--color="blue darken-1" flat-->
            <!--@click="openResource(result.shortUrl)"-->
            <!--&gt;{{ result.shortUrl }}-->
            <!--</v-btn>-->
            <!--</app-activity-form>-->
            <!--<v-divider></v-divider>-->
            <!--</div>-->
          </div>
        </template>
      </ais-results>

      <!--<div id="loadmore">-->
      <!--<v-progress-circular indeterminate color="primary"></v-progress-circular>-->
      <!--loading more-->
      <!--</div>-->
    </ais-index>
  </div>
</template>

<script>
  import Config from '~/config'
  //import ScrollMonitor from 'scrollmonitor'

  import ResourceDescription from '~/components/Resources/ResourceDescription.vue'
  //import Form from '../activities/ActivityForm.vue'

  export default {

    components: {
      appResourceDescription: ResourceDescription,
      //appActivityForm: Form
    },

    data() {
      return {
        Config,
        expand: false,
        page: 1,
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

        //return result.sourceNameAbbrev

        let t = (result.sourceNameAbbrev ? result.sourceNameAbbrev : '') +
          (result.sourcePubDate ? result.sourcePubDate : '') +
          (result.sourceVolume ? '; '+result.sourceVolume : '') +
          (result.sourceIssue ? '('+result.sourceIssue+')' : '') +
          (result.sourcePages ? ': '+result.sourcePages : '')

        if (t) {
          return t
        }

        // resort to the short link url
        return result.shortUrl
      },

      openResource(url) {
        window.open(url)
      },


      loadMore: function () {
        this.page++;
      },
    },

    mounted() {
      // let e = document.getElementById('loadmore')
      // let w = ScrollMonitor.create(e)
      // w.enterViewport(() => {
      //     this.loadMore()
      // })
    }
  }
</script>

<style scoped>
  .search-input {
    margin-bottom: 20px;
    padding-left: 4px;
    border: solid #ccc 1px;
    border-radius: 5px;
    font-size: 20px;
  }

  .highlight-terms em {
    font-style: normal;
  }

  .resource-link {
    text-transform: lowercase;
    margin-left: 0px;
  }
</style>
