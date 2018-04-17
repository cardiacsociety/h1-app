<template>
  <div>
    <!--click wrapper as cannot listen for click on a slot-->
    <span @click="openModal">

      <slot name="open">open</slot>

    </span>
    <div class="modal" :class="{'is-active': open}">
      <div class="modal-background"></div>
      <div class="modal-content">

        <div class="message is-danger">
          <div class="message-header">
            Delete Activity
            <button class="delete" @click="closeModal"></button>
          </div>
          <div class="message-body">
            You are about to delete the following activity: <br>
            <strong>{{ activityData.date }} - {{ activityData.activity }}</strong> ({{ activityData.type }}):
            <i>{{ activityData.description }}</i><br>
            <br>
            This action <strong>cannot be reversed</strong><br>
            <br>
            <button class="button is-danger" @click="deleteMemberActivity(activityData.id)">delete</button>&nbsp;
            <button class="button" @click="closeModal">cancel</button>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
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

      deleteMemberActivity(id) {
        this.$store.dispatch("activity/deleteMemberActivity", id)
          .then(() => {
            this.$root.$emit("activityDelete")
            this.closeModal()
          })
          .catch((err) => {
            console.log(err)
          })
      }
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
