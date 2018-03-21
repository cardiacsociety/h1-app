<template>
  <div>
    <h4 class="title is-4">HAS-BLED Score for Major Bleeding Risk</h4>
    <p class="subtitle is-6">Estimates risk of major bleeding for patients on anticoagulation
      to assess risk-benefit in atrial fibrillation care.</p>
    <hr>

    <div class="field">
      <label class="label">Hypertension</label>
      <p class="help">Uncontrolled, >160 mmHg systolic</p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="ht" value="0">No</label>
        <label class="radio"><input type="radio" v-model="ht" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Renal disease</label>
      <p class="help">Dialysis, transplant, Cr >2.26 mg/dL or >200 µmol/L</p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="rd" value="0">No</label>
        <label class="radio"><input type="radio" v-model="rd" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Liver disease</label>
      <p class="help">Cirrhosis or bilirubin >2x normal with AST/ALT/AP >3x normal</p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="ld" value="0">No</label>
        <label class="radio"><input type="radio" v-model="ld" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Stroke history</label>
      <div class="control">
        <label class="radio"><input type="radio" v-model="sh" value="0">No</label>
        <label class="radio"><input type="radio" v-model="sh" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Bleeding</label>
      <p class="help">Prior major bleeding or predisposition to bleeding</p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="bl" value="0">No</label>
        <label class="radio"><input type="radio" v-model="bl" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Labile INR</label>
      <p class="help">Unstable/high INRs, time in therapeutic range <60%</p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="li" value="0">No</label>
        <label class="radio"><input type="radio" v-model="li" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Age >65</label>
      <div class="control">
        <label class="radio"><input type="radio" v-model="age" value="0">No</label>
        <label class="radio"><input type="radio" v-model="age" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Medication usage predisposing to bleeding</label>
      <p class="help">Antiplatelet agents, NSAIDs</p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="med" value="0">No</label>
        <label class="radio"><input type="radio" v-model="med" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <hr>


    <div :class="{'notification' : true, 'is-success': score < 3, 'is-warning': score >= 3, 'is-danger': score > 5}">
      <p>Score: {{ score }}</p>
      <p>{{ risk }}</p>
      <p>{{ recommendation }}</p>
    </div>

    <div class="notification">
      <p>
        <sup>1</sup> <a href="https://doi.org/10.1016/j.jacc.2010.09.024" target="_blank">
        https://doi.org/10.1016/j.jacc.2010.09.024</a>
      </p>
      <p>
        <sup>2</sup> <a href="http://dx.doi.org/10.1378/chest.10-0134" target="_blank">
        http://dx.doi.org/10.1378/chest.10-0134</a>
      </p>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        ht: 0,
        rd: 0,
        ld: 0,
        sh: 0,
        bl: 0,
        li: 0,
        age: 0,
        med: 0,
        alc: 0,

        // Risk from two validation studies
        risk1: [0.9, 3.4, 4.1, 5.8, 8.9, 9.1],
        risk2: [1.13, 1.02, 1.88, 3.74, 8.7, 12.5],
        suggestions: [
          "Anticoagulation should be considered - relatively low risk for major bleeding (~1/100 patient-years)",
          "Anticoagulation should be considered - relatively low risk for major bleeding (~1/100 patient-years)",
          "Anticoagulation can be considered, however moderate risk for major bleeding (~2/100 patient-years)",
          "Alternatives to anticoagulation should be considered - high risk for major bleeding."
        ]
      }
    },

    computed: {
      score() {
        return (
          parseInt(this.ht) +
          parseInt(this.rd) +
          parseInt(this.ld) +
          parseInt(this.sh) +
          parseInt(this.bl) +
          parseInt(this.li) +
          parseInt(this.age) +
          parseInt(this.med) +
          parseInt(this.alc)
        )
      },

      // risk reported by two separate validation studies, so this returns a computed comment
      // based on the score
      risk() {
        let s = ""
        if (this.score <= 5) {
          s = "Risk " + this.risk1[this.score] + "%\u00B9, " +
            this.risk2[this.score] + " bleeds per 100 patient-years\u00B2"
        } else {
          s = "No data, risk likely to be great than 10%."
        }
        return s
      },

      recommendation() {
        let s = ""
        if (this.score < 3) {
          s = this.suggestions[this.score]
        } else {
          s = this.suggestions[3]
        }

        return s
      }
    }
  }
</script>

<style scoped>

</style>
