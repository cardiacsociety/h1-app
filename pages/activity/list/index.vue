<template>
    <div id="top">
        <PageHeader
                title="Activity List"
                subtitle="View &amp; manage records"
                :subnav="$store.state.nav.activities"
        />
        <PageSection>
            <h4 class="title is-4">All Activity</h4>
            <p class="subtitle is-7">Click row for actions</p>

            <template v-for="a in memberActivities">

                <div :id="'aid-' + a.id"></div>

                <div
                        class="notification activity-row"
                        :key="a.id"
                        v-if="currentEditId != a.id"
                        @click="setCurrentEditId(a.id)"
                >
                    <span class="is-size-7">{{ a.date }}: {{ a.activity }} - {{ a.type }}</span><br>
                    {{ a.description }}
                </div>

                <div :key="a.id" v-if="currentEditId == a.id">

                    <div class="message is-info activity-row-focused">
                        <div class="message-header">
                            Date: {{ a.date | formatDate }} - Credit: {{ a.credit }}
                            <button class="delete" @click="currentEditId = null"></button>
                        </div>
                        <div class="message-body">
                            <p class="has-text-weight-bold">
                                {{ a.activity }} <span v-if="a.typeId"> - {{ a.type }}</span>
                            </p>
                            <p class="is-italic">
                                {{ a.description }}
                            </p>
                            <div class="level is-mobile">
                                <div class="level-left">
                                    <div class="level-item" v-if="a.typeId">
                                        <ActivityEditModal :activityData="currentEditActivity" :autoOpen="autoOpenEdit">
                                            <template slot="open">
                                                <button class="button is-small is-warning"><i class="fa fa-edit"></i>&nbsp;edit
                                                </button>&nbsp;
                                            </template>
                                        </ActivityEditModal>
                                    </div>
                                    <div class="level-item" v-else>
                                        <HelpModal name="CANNOT_EDIT_ACTIVITY">
                                            <template slot="open">
                                                <button class="button is-small"><i class="fa fa-ban"></i>&nbsp;edit
                                                </button>&nbsp;
                                            </template>
                                        </HelpModal>
                                    </div>
                                    <div class="level-item">
                                        <ActivityCopyModal :activityData="currentEditActivity">
                                            <template slot="open">
                                                <button class="button is-small is-success"><i class="fa fa-copy"></i>&nbsp;copy
                                                </button>&nbsp;
                                            </template>
                                        </ActivityCopyModal>
                                    </div>
                                    <div class="level-item">
                                        <ActivityDeleteModal :activityData="a">
                                            <template slot="open">
                                                <button class="button is-small is-danger"><i class="fa fa-times"></i>&nbsp;delete
                                                </button>&nbsp;
                                            </template>
                                        </ActivityDeleteModal>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </template>

            <p class="buttons">
                <button class="button is-link" @click="scrollToTop">top</button>
                <button class="button is-link" @click="scrollTo(currentEditId)" v-if="currentEditId">selected</button>
            </p>

        </PageSection>
    </div>
</template>

<script>

  import ActivityCopyModal from '~/components/Activity/ActivityCopyModal'
  import ActivityEditModal from '~/components/Activity/ActivityEditModal'
  import ActivityDeleteModal from '~/components/Activity/ActivityDeleteModal'
  import HelpModal from '~/components/Help/HelpModal'

  export default {

    components: {
      ActivityCopyModal,
      ActivityEditModal,
      ActivityDeleteModal,
      HelpModal,
    },

    data() {
      return {
        currentEditId: null,
        autoOpenEdit: false,
      }
    },

    computed: {

      memberActivities() {
        return this.$store.state.activity.memberActivities
      },

      // This ensures a fresh copy from the store
      currentEditActivity() {
        let activity = {}
        this.$store.state.activity.memberActivities.forEach((a) => {
          if (a.id == this.currentEditId) {
            activity = a
          }
        })
        return activity
      },
    },

    methods: {

      scrollToTop() {
        this.$scrollTo('#top')
      },

      scrollTo(id) {
        this.$scrollTo('#aid-' + id)
      },

      scrollToAndSelect(id) {
        this.currentEditId = id
        this.scrollTo(id)
      },

      scrollToAndEdit(id) {
        this.autoOpenEdit = true
        this.currentEditId = id
        this.scrollTo(id)
      },

      setCurrentEditId(id) {
        this.autoOpenEdit = false
        this.currentEditId = id
      },

      // refreshSelectedActivity unsets, and then resets the currentEditId to ensure that the props (activityData) being
      // passed to the edit and copy modal components are updated in the DOM. Otherwise, if a user edited and saved a
      // record and then clicked the copy button immediately after, the props that get passed to the activity form are
      // the values prior to the edit - as they are sitting there in the DOM unmodified after the edit.
      refreshSelectedActivity(id) {
        this.currentEditId = 0
        setTimeout(() => {
          this.scrollToAndSelect(id) // reselects the same row and we get fresh props
        }, 2000)
      },

    },

    beforeMount() {
      this.$store.dispatch("activity/fetchMemberActivities")
    },

    mounted() {

      // listen for updates to an activity, and rebuild the list if so
      // todo ... this should just update the relevant record instead of rebuilding the entire list
      this.$root.$on("activityUpdated", (id) => {
        this.scrollToTop()
        this.$store.dispatch("activity/fetchMemberActivities")
          .then(() => {
            this.refreshSelectedActivity(id)
          })
      })

      this.$root.$on("activityDeleted", () => {
        this.$store.dispatch("activity/fetchMemberActivities")
        this.currentEditId = null
      })

      // query options - scroll=1234, select=1234, edit=1234
      if (this.$route.query.scroll) {
        this.scrollTo(this.$route.query.scroll)
      }
      if (this.$route.query.select) {
        this.scrollToAndSelect(this.$route.query.select)
      }
      if (this.$route.query.edit) {
        this.scrollToAndEdit(this.$route.query.edit)
      }
    }
  }
</script>

<style scoped>
    .activity-row {
        margin-bottom: 10px;
    }

    .activity-row-focused {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .activity-row:hover {
        cursor: pointer;
        background-color: #f1f1f1;
    }

    .activity-row-focused:hover {
        cursor: default;
    }

</style>
