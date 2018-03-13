<template>
  <div>

    <div class="field">
      <label class="label">Date</label>
      <div class="control has-icons-left">
        <DatePicker name="date" placeholder="select date of activity" readonly
                    :config="{defaultDate: dateToday }"
                    v-model="form.date"
        >
        </DatePicker>
        <span class="icon is-small is-left">
          <i class="fa fa-calendar"></i>
        </span>
        <div class="help">
            <span>&nbsp;</span>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Quantity (hours)</label>
      <div :class="{ 'control': true }">
        <input name="quantity" type="text" placeholder="eg 0.25"
               v-model="form.quantity"
               v-validate="'required|decimal:2|min_value:0.25|max_value:24'"
               :class="{'input': true, 'is-danger': errors.has('quantity') }"
        >
        <div class="help">
          <span v-if="errors.has('quantity')" class="has-text-danger">
            {{ errors.first('quantity') }}
          </span>&nbsp;
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Activity</label>
      <div class="control">
        <div :class="{'select': true, 'is-danger': errors.has('activityTypeId')}">
          <select name="activityTypeId"
                  v-model="form.activityTypeId"
                  v-on:change="setActivityId"
                  v-validate="'required|numeric'"
          >
            <optgroup v-for="activity in activityTypes" :label="activity.name + ' (' + activity.code +')'">
              <option v-for="type in activity.types" :value="type.id">
                {{ type.name }}
              </option>
            </optgroup>
          </select>
        </div>
        <div class="help">
            <span v-if="errors.has('activityTypeId')" class="has-text-danger">
              {{ errors.first('activityTypeId') }}
            </span>&nbsp;
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea name="description" placeholder="Provide some details about the activity"
                  v-model="form.description"
                  v-validate="'required'"
                  :class="{'textarea': true, 'is-danger': errors.has('description')}">
        ></textarea>
        <div class="help">
          <span v-if="errors.has('description')" class="has-text-danger">
            {{ errors.first('description') }}
          </span>&nbsp;
        </div>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button" v-if="!valid" v-on:click="validateForm">Save</button>
        <button class="button is-success" v-if="valid" v-on:click="saveActivity">Save</button>&nbsp;
        <button class="button">Cancel</button>
        <div>valid: {{ valid }}</div>
        <div>errors: {{ errors.items }}</div>
        <div>form: {{ form }}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import DatePicker from 'vue-bulma-datepicker'

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
      DatePicker,
    },


    data() {
      return {

        form: {
          memberActivityId: null,
          activityId: null,
          activityTypeId: null,
          date: null,
          quantity: null,
          description: null,
        },
      }
    },

    computed: {

      dateToday() {
        return new Date()
      },

      activityTypes() {
        return this.$store.state.activity.activityTypes
      },

      selectedActivityId() {
        let id = 0
        const a = this.$store.getters["activity/activitiesFlatArray"]
        if (this.form.activityTypeId) {
          id = a[this.form.activityTypeId]
          this.form.activityId = id
        }

        return id
      },

      valid: {

        // default set to false
        set() {
          return false
        },

        get() {

          // first check for non-falsey values...
          if (this.form.activityId && this.form.activityTypeId && this.form.date && this.form.description) {

            // then if no errors
            if (!this.errors.items.length) {
              return true
            }
          }

          return false
        }
      },

    },

    methods: {

      // setActivityId is triggered when the user selects the activity type from the drop list.
      // It sets the activity id which is the 'parent' type of the activity type selected using a computed value.
      setActivityId() {
        this.form.activityId = this.selectedActivityId
      },

      validateForm() {
        let v = false
        this.$validator.validateAll()
          .then(res => {
            if (res) {
              v = true
            }
          })

        return false
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

      //
      // // clear form values - note, also clears the date
      // resetForm() {
      //   this.$refs.form.reset()
      // }

    },

    created() {
      // set activityTypes
      this.$store.dispatch("activity/setActivityTypes")

      // activityData object can be used to initialise the local activity object
      if (this.activityData) {

        console.log("set activity data")

        // id of member activity record (when editing)
        if (this.activityData.memberActivityId) {
          this.form.memberActivityId = this.activityData.memberActivityId
        }

        // activity
        if (this.activityData.activityId) {
          this.form.activityId = this.activityData.activityId
        }

        // activity TYPE id
        if (this.activityData.activityTypeId) {
          this.form.activityTypeId = this.activityData.activityTypeId
        }

        // date
        if (this.activityData.date) {
          this.form.date = this.activityData.date
        }

        // quantity (generally quantity)
        if (this.activityData.quantity) {
          this.form.quantity = this.activityData.quantity
        }

        // Description / details
        if (this.activityData.description) {
          this.form.description = this.activityData.description
        }
      }

    },


    mounted() {

      // this.$nextTick(() => {
      //
      //   // activityData object can be used to initialise the local activity object
      //   if (this.activityData) {
      //
      //     // id of member activity record (editing an existing record)
      //     if (this.activityData.id) {
      //       this.activity.id = this.activityData.id
      //     }
      //
      //     // quantity (generally quantity)
      //     if (this.activityData.quantity) {
      //       // initialise the computed value, watcher will set activity.quantity
      //       this.quantity = this.activityData.quantity
      //     }
      //
      //     // id of activity TYPE
      //     if (this.activityData.typeId) {
      //       this.activity.typeId = this.activityData.typeId
      //     }
      //
      //     // Description / details
      //     if (this.activityData.description) {
      //       this.activity.description = this.activityData.description
      //     }
      //   }
      //
      //   // Start the timer if it is a new record
      //   if (!this.activityData || !this.activityData.id) {
      //     this.startTimer()
      //   }
      // })

    },
  }
</script>

<style scoped>
</style>
