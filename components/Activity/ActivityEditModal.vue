<template>
  <div>
    <!--click wrapper as cannot listen for click on a slot-->
    <span @click="openModal">
      <slot name="open">open</slot>
    </span>
    <div class="modal" :class="{'is-active': open}">
      <div class="modal-background"></div>
      <div class="modal-content">

        <div class="notification">
          <button class="delete" @click="closeModal"></button>
          <h4 class="title is-4">CPD Activity</h4>
          <ActivityForm :activityData="activityData"/>
        </div>

      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>
  import ActivityForm from "~/components/Activity/ActivityForm"

  export default {

    props: {
      // Option to pre-populate activity form
      activityData: {
        type: Object,
      },
    },

    components: {
      ActivityForm,
    },

    data() {
      return {

        open: false,
        errorAlert: false,
        errorMessage: null,

        // Form data elements
        activity: {
          id: null,
          typeId: null,
          date: null,
          quantity: 0,
          description: "",
        },
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

      // activityData object can be used to initialise the local activity object
      if (this.activityData) {

        // id of member activity record (editing an existing record)
        if (this.activityData.id) {
          this.activity.id = this.activityData.id
        }

        // quantity (generally hours)
        if (this.activityData.quantity) {
          // initialise the computed value, watcher will set activity.quantity
          this.quantity = this.activityData.quantity
        }

        // id of activity TYPE
        if (this.activityData.typeId) {
          this.activity.typeId = this.activityData.typeId
        }

        // Description / details
        if (this.activityData.description) {
          this.activity.description = this.activityData.description
        }
      }

      // listen for a 'close' event
      this.$root.$on('close', () => {
        this.closeModal()
      })

    },
  }
</script>

<style scoped>
</style>
