<template>
  <div>
    <PageHeader
      title="History"
      subtitle="View and manage CPD activity records"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <h4 class="title is-4">All Activities</h4>
      <p class="subtitle is-6">Click a record for actions.</p>

      <template v-for="a,i in memberActivities">

        <div class="notification activity-row" :key="i" @click="currentEditIndex = i" v-if="currentEditIndex != i">
          <span class="is-size-7">{{ a.date }}: {{ a.activity }} - {{ a.type }}</span><br>
          {{ a.description }}
        </div>

        <div :key="i" v-if="currentEditIndex === i">
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
                    <button class="button is-small is-success"><i class="fa fa-copy"></i>&nbsp;copy</button>&nbsp;
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

  import ActivityEditModal from '~/components/Activity/ActivityEditModal'
  import ActivityDeleteModal from '~/components/Activity/ActivityDeleteModal'
  import HelpModal from '~/components/Help/HelpModal'

  export default {

    components: {
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

      token() {
        return this.$store.state.session.token.jwt
      },

      memberActivities() {
        return this.$store.state.activity.memberActivities
      }
    },

    methods: {
      openModal() {
        alert("edit this")
      }
    },

    beforeMount() {
      this.$store.dispatch("activity/fetchMemberActivities", this.token)
    },

    mounted() {
      // listen for updates to an activity, and rebuild the list if so
      // todo ... this should just update the relevant record instead of rebuilding the entire list
      this.$root.$on("activityUpdate", () => {
        this.$store.dispatch("activity/fetchMemberActivities", this.token)
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
