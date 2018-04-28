<template>
    <div>
        <!--click wrapper as cannot listen for click on a slot-->
        <span @click="openModal"><slot name="open">open</slot></span>
        <div class="modal" :class="{'is-active': open}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <ActivityForm :activityData="activityWithoutID"/>
                <div class="box">
                    {{ activityWithoutID }}
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
      }
    },

    computed: {

      memberActivities() {
        return this.$store.state.activity.memberActivities
      },

      activityWithoutID() {
        for (let i = 0; i < this.memberActivities.length; i++) {
          if (this.memberActivities[i].id == this.activityData.id) {
            return this.unsetID(this.memberActivities[i])
          }
        }
      },

    },


    methods: {
      openModal() {
        this.open = true
      },

      closeModal() {
        this.open = false
      },

      unsetID(activity) {
        let a = Object.assign({}, activity)
        a.id = null
        return a
      }

    },

    mounted() {
      this.$root.$on('cancel', () => {
        this.closeModal()
      })
    },
  }
</script>

<style scoped>
</style>
