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
          <div class="notification is-info activity-row-focused">
            <span class="field-name is-size-7 has-text-weight-bold">Date:</span> {{ a.date | formatDate }}<br>
            <span class="field-name is-size-7 has-text-weight-bold">Credit:</span> {{ a.credit }}<br>
            <span class="has-text-weight-bold">{{ a.activity }} <span v-if="a.typeId"> - {{ a.type }}</span></span><br>
            <span class="is-italic">{{ a.description }}</span><br>
            <hr>

            <div class="columns">
              <div class="column is-1" v-if="a.typeId">
                <ActivityEditModal :activityData="a">
                  <template slot="open">
                    <button class="button is-small is-warning"><i class="fa fa-edit"></i>&nbsp;edit</button>&nbsp;
                  </template>
                </ActivityEditModal>
              </div>
              <div class="column is-1" v-else>
                <HelpModal name="CANNOT_EDIT_ACTIVITY">
                  <template slot="open">
                    <button class="button is-small"><i class="fa fa-ban"></i>&nbsp;edit</button>&nbsp;
                  </template>
                </HelpModal>
              </div>
              <div class="column is-1">
                <button class="button is-small is-success"><i class="fa fa-copy"></i>&nbsp;copy</button>&nbsp;
              </div>
              <div class="column is-1">
                <button class="button is-small is-danger"><i class="fa fa-times"></i>&nbsp;delete</button>
              </div>
            </div>
          </div>
        </div>

      </template>

      <!--<pre>-->
      <!--<code>-->
      <!--{{ memberActivities }}-->
      <!--</code>-->
      <!--</pre>-->

    </PageSection>
  </div>


</template>

<script>

  import ActivityEditModal from '~/components/Activity/ActivityEditModal'
  import HelpModal from '~/components/Help/HelpModal'

  export default {

    components: {
      ActivityEditModal,
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
  }
</script>

<style scoped>
  .activity-row {
    margin-bottom: 10px;
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
