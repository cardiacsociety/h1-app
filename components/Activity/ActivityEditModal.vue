<template>
    <div>
        <!--click wrapper as cannot listen for click on a slot-->
        <span @click="openModal"><slot name="open">open</slot></span>
        <div class="modal" :class="{'is-active': open}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <ActivityForm :activityData="activityData"/>
            </div>
        </div>
    </div>
</template>

<script>
  import ActivityForm from "~/components/Activity/ActivityForm"

  export default {

    props: {
      activityData: {
        type: Object,
      },
      autoOpen: {
        type: Boolean,
        default: false
      },
    },

    components: {
      ActivityForm,
    },

    data() {
      return {
        open: false,
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

      if (this.autoOpen) {
        this.openModal()
      }
    },
  }
</script>

<style scoped>
</style>
