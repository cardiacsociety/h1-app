<template>
    <div>
        <!--click wrapper as cannot listen for click on a slot-->
        <span @click="openModal"><slot name="open">open</slot></span>
        <div class="modal" :class="{'is-active': open}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <template v-if="showForm">
                    <ActivityForm/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
  import ActivityForm from "~/components/Activity/ActivityForm"

  export default {

    components: {
      ActivityForm,
    },

    data() {
      return {
        open: false,
        errorAlert: false,
        errorMessage: null,
        showForm: true,
      }
    },

    methods: {
      openModal() {
        this.open = true
      },
      closeModal() {
        this.open = false
      },

    },

    mounted() {

      this.$root.$on("cancel", () => {
        this.closeModal()
      })

      // todo - delay when scrolling to edit
      // go and edit ... works from everywhere except the list page itself... because the new record is not yet
      // in the DOM when this runs... so might need some kind of delay, or could direct to another page then back again?
      // where we catch this event the activity Update list might not yet have completed... this will be an issue.
      // trying this... dispatch update from here and once it is done, go to edit list
      // this.$root.$on("activityUpdated", (id) => {
      //   console.log("Heard activityUpdated in mounted() in ActivityAddModal")
      //   this.$store.dispatch("activity/fetchMemberActivities")
      //     .then(() => {
      //       this.$router.push("/activity/list?edit=" + id)
      //     })
      // })
    },
  }
</script>

<style scoped>
</style>
