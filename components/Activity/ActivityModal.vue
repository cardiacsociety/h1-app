<template>
  <div>
    <!--click wrapper as cannot listen for click on a slot-->
    <span @click="openModal">
      <slot name="open">open</slot>
    </span>
    <div class="modal" :class="{'is-active': open}">
      <div class="modal-background"></div>
      <div class="modal-content">

        <div class="notification is-info" v-if="!activityFormOpen">
          <!--<button class="delete" @click="closeModal"></button>-->
          <h4 class="title is-4">You opened a resource.</h4>
          <div class="subtitle is-6">Would you like to record this activity?</div>
          <div>
            <button class="button is-success is-large" @click="activityFormOpen = true">Yes</button>&nbsp;
            <button class="button is-danger  is-large" @click="closeModal">No</button>
          </div>
        </div>
        <div class="notification" v-if="activityFormOpen">
          <button class="delete" @click="closeModal"></button>
          <h4 class="title is-4">Record CPD Activity</h4>
          <ActivityForm/>
        </div>

      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>
  import ActivityForm from "~/components/Activity/ActivityForm"

  // import {EventBus} from '../../main'
  // import moment from 'moment'
  // import activities from '../../data/activities'
  // import DateField from '../form/DateField.vue'

  export default {
    props: {

      // the index of the item is the form is opened from a list
      // use to update the list display when the form is submitted
      index: {
        type: Number,
      },

      // Option to pass in an activity object to pre-populate
      activityData: {
        type: Object,
      },

      // Force a fresh form
      reset: {
        type: Boolean,
        default: false
      }
    },

    components: {
      ActivityForm,
    },

    data() {
      return {

        open: false,
        activityFormOpen: false,
        errorAlert: false,
        errorMessage: null,

        timerSeconds: 30, // hack to avoid initial validation message
        timerRunning: false,
        intervalId: null,

        // Form data elements
        activity: {
          id: null,
          typeId: 5,
          date: null,
          quantity: 0,
          description: "",
        },

        lastQuantity: 0,

        // Validation
        quantityRules: [
          (v) => !!v && v && v > 0 || "Required > 0"
        ],
        activityTypeRules: [
          (v) => !!v || "Required"
        ],
        descriptionRules: [
          (v) => v && v.length > 2 || "Required"
        ],

      }
    },

    computed: {
      timerColour() {
        if (this.timerRunning) {
          return 'green'
        }
        return 'red'
      },
      timerIcon() {
        if (this.timerRunning) {
          return 'pause'
        }
        return 'play_arrow'
      },

      date() {
        if (this.activityData && this.activityData.date) {
          return this.activityData.date
        }
        if (this.activity && this.activity.date) {
          return this.activity.date
        }
        return ""
      },


      // activity types in select list
      activityTypes() {
        return this.$store.state.activityTypes
      },


      // computed 'quantity' value for the text input. Only calculated when the timer is running to
      // avoid interference with manual user input.
      quantity: {
        get() {
          if (this.timerRunning) {
            this.lastQuantity = (this.timerSeconds / 3600).toFixed(2)
          }
          return this.lastQuantity
        },
        // setter called when input is updated, by timer or user input
        set(hours) {
          this.timerSeconds = hours * 3600 // sets the timer value
          this.lastQuantity = hours  // updates quantity (quantity) - see above
        }
      },

      valid: {
        set() {
          return false
        },
        get() {
          if (this.activity.quantity
            && this.activity.typeId
            && this.activity.date
            && this.activity.description) {
            return true
          }
          return false
        }
      },

    },

    watch: {
      // sync the computed quantity with activity.quantity
      quantity() {
        this.activity.quantity = parseFloat(this.quantity)
      }
    },

    methods: {

      openModal() {
        this.open = true
      },

      closeModal() {
        this.open = false
      },

      // setter for the date child component
      setDate(date) {
        this.activity.date = date
      },

      startTimer() {
        this.timerRunning = true
        this.IntervalId = setInterval(() => {
          this.timerSeconds++
        }, 1000)
      },

      stopTimer() {
        this.timerRunning = false
        clearInterval(this.IntervalId)
      },

      toggleTimer() {
        if (this.timerRunning) {
          this.stopTimer()
        } else {
          this.startTimer()
        }
      },

      // Save the activity, if we have an id we are updating, if not, adding
      // Note: graphql works this out by the presence of the id, but keep seperate
      // functions for now - in case we revert.
      saveActivity() {

        activities.setMemberActivity(this.activity)
          .then((r) => {
            const updatedActivity = r.memberUser.setActivity
            this.$store.commit('setMemberActivity', updatedActivity)
            EventBus.$emit('alert', {text: "Activity updated!"}) // global 'snackbar' alert
            this.open = false
          })
          .catch(() => {
            console.log(r)
            this.errorAlert = true // this page error alert
            this.errorMessage = "Error saving..."
          })
      },

      // clear form values - note, also clears the date
      resetForm() {
        this.$refs.form.reset()
      }

    },

    filters: {
      timerDisplay(seconds) {

        // by default moment.js will return the string "invalid date" if seconds
        // is not a valid number. As we aren't really inputting date, it is a time
        // catch this first and return our own message. Note this appears on the timer
        // itself in place of 'hh:mm:ss' so it should be short and sweet.
        if (isNaN(seconds) || seconds < 0) {
          return "invalid time"
        }

        return moment.utc(seconds * 1000).format('HH:mm:ss')
      }
    },

    mounted() {

      this.$nextTick(() => {

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

        // Start the timer if it is a new record
        if (!this.activityData || !this.activityData.id) {
          this.startTimer()
        }
      })

    },
  }
</script>

<style scoped>
</style>
