<template>
  <div>

    <h4 class="title is-4">Creatinine Clearance</h4>
    <p class="subtitle is-6">Calculates CrCl according to the Cockcroft-Gault equation</p>
    <hr>

    <div class="field">
      <label class="label">Sex</label>
      <p class="help"></p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="sex" value="m">&nbsp;Male</label>
        <label class="radio"><input type="radio" v-model="sex" value="f">&nbsp;Female</label>
      </div>
    </div>

    <div class="field">
      <label class="label">Age (years)</label>
      <div class="control">
        <input class="input" type="text" placeholder="Years" v-model="age">
      </div>
    </div>

    <div class="field">
      <label class="label">Weight (kg)</label>
      <div class="control">
        <input class="input" type="text" placeholder="kg" v-model="weight">
      </div>
    </div>

    <div class="field">
      <label class="label">Creatinine (µmol/L)</label>
      <div class="control">
        <input class="input" type="text" placeholder="µmol/L" v-model="creatinine">
      </div>
    </div>

    <div class="field">
      <label class="label">Height (cm)</label>
      <p class="help">Adjusts result based on BMI calculation</p>
      <div class="control">
        <input class="input" type="text" placeholder="cm" v-model="height">
      </div>
    </div>

    <div class="notification is-info">
      <h3 class="title is-3">Result</h3>
      <h5 class="title is-5" v-if="resultOriginal">
        {{ resultOriginal | round0 }} mL/min (original equation)
      </h5>
      <h5 class="title is-5" v-if="height && resultAdjustedBW">
        {{ resultAdjustedBW | round0 }} mL/min (adjusted weight {{ adjustedBodyWeight | round0 }}kg)
      </h5>
      <h5 class="title is-5" v-if="height && resultIdealBW">
        {{ resultIdealBW | round0 }} mL/min (ideal weight {{ idealBodyWeight | round0 }}kg)
      </h5>
      <p v-if="!resultOriginal">Pending...</p>
    </div>

  </div>
</template>

<script>
  export default {

    data() {
      return {
        sex: null,           // m = 1, f = 0.85
        age: null,           // years
        weight: null,        // kg
        creatinine: null,    // umol/L
        height: null,        // cm
      }
    },

    computed: {

      // gender index
      genderIndex() {
        if (this.sex === "m") {
          return 1
        }
        if (this.sex === "f") {
          return 0.85
        }
        return 0
      },

      idealBodyWeight() {
        let ibw = this.weight
        if (this.height) {
          ibw = 2.3 * (this.height * 0.393701 - 60)
          if (this.sex === "m") { // male
            ibw += 50
          }
          if (this.sex === "f") { // female
            ibw += 45.5
          }
        }
        return ibw
      },

      // adjust body weight for ccl equations if height is given
      adjustedBodyWeight() {
        let abw = this.weight
        if (this.height) {
          abw = this.idealBodyWeight + 0.4 * (this.weight - this.idealBodyWeight)
        }
        return abw
      },

      // calculate creatinine clearance using original Cockroft-Gault equation
      resultOriginal() {
        let ccl = 0
        if (this.genderIndex && this.age && this.weight && this.creatinine) {
          ccl = ((140 - this.age) * this.weight) / (0.814 * this.creatinine) * this.genderIndex
        }
        return ccl
      },

      // calculate creatinine clearance for adjusted body weight
      resultAdjustedBW() {
        let ccl = 0
        if (this.genderIndex && this.age && this.weight && this.creatinine) {
          ccl = ((140 - this.age) * this.adjustedBodyWeight) / (0.814 * this.creatinine) * this.genderIndex
        }
        return ccl
      },

      // calculate creatinine clearance for ideal body weight
      resultIdealBW() {
        let ccl = 0
        if (this.genderIndex && this.age && this.weight && this.creatinine) {
          ccl = ((140 - this.age) * this.idealBodyWeight) / (0.814 * this.creatinine) * this.genderIndex
        }
        return ccl
      },

    }
  }
</script>

<style scoped>

</style>
