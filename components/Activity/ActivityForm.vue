<template>
    <div>

        <div v-if="showForm">

            <div class="field">
                <label class="label">Date</label>
                <div class="control has-icons-left">
                    <DatePicker name="date" placeholder="select date of activity" readonly
                                :config="{defaultDate: dateToday }"
                                v-model="form.date"
                    >
                    </DatePicker>
                    <span class="icon is-small is-left">
          <i class="fa fa-calendar"></i>f
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
                <div class="control" v-if="isNewOrHasTypeId">
                    <div :class="{'select': true, 'is-danger': errors.has('typeId')}">
                        <select name="typeId"
                                v-model="form.typeId"
                                v-validate="'required|numeric'"
                        >
                            <optgroup v-for="activity in activityTypes"
                                      :label="activity.name + ' (' + activity.code +')'">
                                <option v-for="type in activity.types" :value="type.id">
                                    {{ type.name }}
                                </option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="help">
            <span v-if="errors.has('typeId')" class="has-text-danger">
              {{ errors.first('typeId') }}
            </span>&nbsp;
                    </div>
                </div>
                <div v-else>
                    <p>
                        This activity record does not appear to have a 'type'. If this is an older record the activity /
                        type cannot be edited. If you do need to edit this record you can copy it or delete it, and
                        create a new one.
                    </p>
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

            <div class="buttons">

                <template v-if="!valid">
                    <button class="button fixed-width" @click="validateForm">Save</button>
                    <button class="button" @click="emitCloseModal">Cancel</button>
                </template>

                <template v-if="valid && saveMode === 'add'">
                    <button :class="{'button': true, 'is-success': true, 'fixed-width': true, 'is-loading': loading}"
                            @click="saveActivity">Save
                    </button>
                    <button class="button" @click="emitCloseModal">Cancel</button>
                </template>

                <template v-if="valid && saveMode === 'update'">
                    <button :class="{'button': true, 'is-success': true, 'is-loading': loading}"
                            @click="saveActivity">Save
                    </button>
                    <div class="file">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume">
                            <span class="file-cta">
                              <span class="file-icon">
                                <i class="fas fa-upload"></i>
                              </span>
                              <span class="file-label">
                                Attach a file…
                              </span>
                            </span>
                        </label>
                    </div>
                </template>

                <!--<div>mode: {{ saveMode }}</div>-->
                <!--<div>valid: {{ valid }}</div>-->
                <!--<div>errors: {{ errors.items }}</div>-->
                <!--<div>props: {{ activityData }}</div>-->
                <!--<div>form: {{ form }}</div>-->
            </div>

        </div>

        <div v-if="message.visible" :class="'notification ' + message.class">
            {{ message.text }}
        </div>

    </div>
</template>

<script>
  import DatePicker from 'vue-bulma-datepicker'

  export default {
    props: {

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

        message: {
          visible: false,
          text: null,
          class: null,
        },

        showForm: true,
        loading: false,

        // After success, emit the 'close' event to close modals, after this many seconds
        millisecondsEmitSavedEvent: 1500,

        form: {
          id: null,
          typeId: null,
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

      // add or edit flag
      saveMode() {
        if (this.activityData && this.activityData.id && this.activityData.typeId) {
          return "update"
        }
        return "add"
      },

      selectedActivityId() {
        let id = 0
        const a = this.$store.getters["activity/activitiesFlatArray"]
        if (this.form.typeId) {
          id = a[this.form.typeId]
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
          if (this.form.typeId && this.form.date && this.form.quantity && this.form.description) {

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
      // NOTE - Don't need this value as the GraphQL server will set the correct activityId based on the typeId
      // setActivityId() {
      //   this.form.activityId = this.selectedActivityId
      // },

      isNewOrHasTypeId() {
        if (!this.activityData) {
          return true
        } else if (this.activityData.id && this.activityData.typeId) {
          return true
        }
        return false
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

      saveActivity() {

        this.loading = true
        // this.$root.$emit("loading", true)
        this.$store.dispatch("activity/saveMemberActivity", this.form)
          .then(res => {
            //this.showForm = false
            //this.$root.$emit("activitySaved", res.data.data.member.saveActivity.id)
            this.$root.$emit("activityUpdated", res.data.data.member.saveActivity.id)
            this.$root.$emit('message', {
              class: "success",
              title: "record saved",
              body: "",
              ttl: 4000
            })
            this.emitCloseModal()
          })
          .catch(err => {
            console.log(err)
            this.$root.$emit('message', {
              class: "error",
              body: "There was a problem saving your data - " + err
            })
          })
      },

      emitCloseModal() {
        this.$root.$emit('closeModal')
      }

      //
      // // clear form values - note, also clears the date
      // resetForm() {
      //   this.$refs.form.reset()
      // }

    },

    created() {
      // set activityTypes
      this.$store.dispatch("activity/fetchActivityTypes")

      // activityData object can be used to initialise the local activity object
      if (this.activityData) {

        // id of member activity record (when editing)
        if (this.activityData.id) {
          this.form.id = this.activityData.id
        }

        // activity
        // if (this.activityData.activityId) {
        //   this.form.activityId = this.activityData.activityId
        // }

        // activity TYPE id
        if (this.activityData.typeId) {
          this.form.typeId = this.activityData.typeId
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
  }
</script>

<style scoped>
    .file {
        margin-top: -0.4rem;
    }
    .fixed-width {
        width: 3.7rem;
    }
</style>
