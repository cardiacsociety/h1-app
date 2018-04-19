<template>
  <div>

    <template v-for="a,i in activityData">
      <div class="columns">
        <div class="column is-3">
          <p><span class="has-text-weight-bold">{{ a.activityName }}</span><br>
            {{ a.activityUnits }} hours x {{ a.creditPerUnit }} credit{{ a.creditPerUnit > 1 ? 's': '' }}<br>
            = {{ a. creditTotal }} (max {{ a.maxCredit }})
          </p>
        </div>
        <div class="column is-3">
          <div>
            {{ calcPercentage(a.creditAwarded, totalCredit) }}% of total
            <progress class="progress is-success"
                      :value="a.creditAwarded"
                      :max="totalCredit"/>
          </div>
          <div>
            {{ calcPercentage(a.creditAwarded, a.maxCredit) }}% of max
            <progress class="progress is-warning"
                      :value="a.creditAwarded"
                      :max="a.maxCredit"/>
          </div>
        </div>
      </div>
      <hr>
    </template>

  </div>
</template>

<script>

  import { percentage } from '~/assets/js/calc.js'

  export default {

    data() {
      return {
        activityData: []
      }
    },

    computed: {

      // return imported function
      calcPercentage() {
        return percentage
      },

      totalCredit() {
        let total = 0
        for (let i = 0; i < this.activityData.length; i++) {
          total += this.activityData[i].creditAwarded
        }
        return total
      },
    },

    methods: {

      fetchReportData() {
        this.$store.dispatch("activity/currentActivityReport")
          .then(r => {
            console.log(r)
            this.activityData = r.data.data.activities
          })
          .catch(r => {
            console.log(r)
          })
      },
    },

    beforeMount() {
      this.fetchReportData()
    },

    mounted() {
      // this.$root.$on("activityUpdate", () => this.updateProgress())
      // this.$root.$on("activityDelete", () => this.updateProgress())
    },
  }
</script>

<style scoped>

</style>
