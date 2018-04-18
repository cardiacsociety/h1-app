<template>
  <div>
    <h1>ActivitySummaryProgress</h1>

    <template v-for="a,i in activityData">
      <div class="columns">
        <div class="column is-narrow">
          <h5 class="title is-5">{{ a.activityName }}</h5>
          <p class="subtitle is-6">
            {{ a.activityUnits }} hours x {{ a.creditPerUnit }} credit{{ a.creditPerUnit > 1 ? 's': '' }} per hour<br>
            = {{ a. creditTotal }} (max allowed {{ a.maxCredit }})
          </p>
        </div>
        <div class="column">
          <div>
            {{ percentage(a.creditAwarded, a.maxCredit) }}% of cap
            <progress class="progress is-warning"
                      :value="a.creditAwarded"
                      :max="a.maxCredit"/>
          </div>
          <div>
            {{ percentage(a.creditAwarded, totalCredit) }}% of total
            <progress class="progress is-success"
                      :value="a.creditAwarded"
                      :max="totalCredit"/>
          </div>
        </div>
      </div>
      <hr>
    </template>

  </div>
</template>

<script>
  export default {

    data() {
      return {
        activityData: []
      }
    },

    computed: {

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

      percentage(numerator, denominator, places) {
        let p = 0
        if (numerator !== 0 && denominator !== 0) {
          p = numerator / denominator * 100
          if (p > 100) {
            p = 100
          }
        }
        return p.toFixed(places)
      }
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
