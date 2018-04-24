<template>
  <div>
    <PageHeader
      title="Activity List"
      subtitle="View &amp; manage records"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <h4 class="title is-4">All Activity</h4>
      <p class="subtitle is-7">Click row for actions</p>

      <template v-for="a in memberActivities">

        <div class="notification activity-row" :key="a.id" @click="currentEditIndex = a.id" v-if="currentEditIndex != a.id">
          <span class="is-size-7">{{ a.date }}: {{ a.activity }} - {{ a.type }}</span><br>
          {{ a.description }}
        </div>

        <div :key="a.id" :id="a.id" v-if="currentEditIndex === a.id">

          <div class="message is-info activity-row-focused">
            <div class="message-header">
              Date: {{ a.date | formatDate }} - Credit: {{ a.credit }}
              <button class="delete" @click="currentEditIndex = null"></button>
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
                    <ActivityEditModal :activityData="a">
                      <template slot="open">
                        <button class="button is-small is-warning"><i class="fa fa-edit"></i>&nbsp;edit</button>&nbsp;
                      </template>
                    </ActivityEditModal>
                  </div>
                  <div class="level-item" v-else>
                    <HelpModal name="CANNOT_EDIT_ACTIVITY">
                      <template slot="open">
                        <button class="button is-small"><i class="fa fa-ban"></i>&nbsp;edit</button>&nbsp;
                      </template>
                    </HelpModal>
                  </div>
                  <div class="level-item">
                    <ActivityCopyModal :activityData="a">
                      <template slot="open">
                        <button class="button is-small is-success"><i class="fa fa-copy"></i>&nbsp;copy</button>&nbsp;
                      </template>
                    </ActivityCopyModal>
                  </div>
                  <div class="level-item">
                    <ActivityDeleteModal :activityData="a">
                      <template slot="open">
                        <button class="button is-small is-danger"><i class="fa fa-times"></i>&nbsp;delete</button>&nbsp;
                      </template>
                    </ActivityDeleteModal>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </template>

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
        currentEditIndex: null,
      }
    },

    computed: {

      memberActivities() {
        return this.$store.state.activity.memberActivities
      }
    },

    methods: {

      openModal() {
        alert("edit this")
      },
    },

    beforeMount() {
      this.$store.dispatch("activity/fetchMemberActivities")
    },

    mounted() {
      // listen for updates to an activity, and rebuild the list if so
      // todo ... this should just update the relevant record instead of rebuilding the entire list
      this.$root.$on("activityUpdated", () => {
        this.$store.dispatch("activity/fetchMemberActivities")
      })
      this.$root.$on("activityDeleted", () => {
        this.$store.dispatch("activity/fetchMemberActivities")
        this.currentEditIndex = null
      })
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

  .field-name {
    display: inline-block;
    width: 3.6rem;
  }

</style>
