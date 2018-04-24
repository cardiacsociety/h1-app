<template>
  <div>
    <!--click wrapper as cannot listen for click on a slot-->
    <span @click="openModal">

      <slot name="open">open</slot>

    </span>
    <div class="modal" :class="{'is-active': open}">
      <div class="modal-background"></div>
      <div class="modal-content">

        <div class="message is-warning">
          <div class="message-header">
            Edit CPD Activity - ID {{ activityData.id }}
            <button class="delete" @click="closeModal"></button>
          </div>
          <div class="message-body">
            <ActivityForm :activityData="activityData"/>
          </div>
        </div>

      </div>
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
      this.$root.$on("activityUpdated", () => {
        this.closeModal()
      })
      this.$root.$on("cancel", () => {
        this.closeModal()
      })

    },
  }
</script>

<style scoped>
</style>
