<template>
  <div>
    <!--click wrapper as cannot listen for click on a slot-->
    <span @click="openModal">

      <slot name="open">open</slot>

    </span>
    <div class="modal" :class="{'is-active': open}">
      <div class="modal-background"></div>
      <div class="modal-content">

        <div class="message is-success">
          <div class="message-header">
            Add CPD Activity
            <button class="delete" @click="closeModal"></button>
          </div>
          <div class="message-body">
            <ActivityForm/>
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
      // listen for a 'close' event
      this.$root.$on('close', () => {
        this.closeModal()
      })
    },
  }
</script>

<style scoped>
</style>
