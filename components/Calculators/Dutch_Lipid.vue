<template>
  <div>

    <h4 class="title is-4">Dutch Lipid Clinical Network Score</h4>
    <p class="subtitle is-6">Diagnoses familial hypercholesterolemia (FH) based on clinical, genetic and family
      history.</p>

    <hr>

    <h5 class="title is-5">Family History</h5>
    <p class="subtitle is-7">*Premature = <55 years in men; <60 years in women.</p>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="familyHistory.a">
          First-degree relative with premature* coronary and/or vascular disease
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="familyHistory.b">
          First-degree relative with known LDL >95th percentile for age and sex
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="familyHistory.c">
          First-degree relative with tendon xanthomata and/or arcus cornealis
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="familyHistory.d">
          Children <18 years with known LDL >95th percentile for age and sex
        </label>
      </div>
    </div>

    <hr>

    <h5 class="title is-5">Clinical History</h5>
    <p class="subtitle is-7">*Premature = <55 years in men; <60 years in women.</p>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="clinicalHistory.a">
          Patient with premature* coronary artery disease
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="clinicalHistory.b">
          Patient with premature* cerebral or peripheral vascular disease
        </label>
      </div>
    </div>

    <hr>

    <h5 class="title is-5">Physical Examination</h5>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="physicalExamination.a">
          Tendon xanthomata
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="physicalExamination.b">
          Arcus cornealis at age <45 years
        </label>
      </div>
    </div>

    <hr>

    <h5 class="title is-5">Cholesterol Level</h5>
    <p class="subtitle is-7">LDL in mmol/L (mg/dL)</p>

    <div class="field">
      <div class="control">
        <label class="radio"><input type="radio" v-model="cholesterol" value="8">&nbsp;LDL-C ≥8.5 (330)</label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="radio"><input type="radio" v-model="cholesterol" value="5">&nbsp;LDL-C 6.5-8.4 (250-329)</label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="radio"><input type="radio" v-model="cholesterol" value="3">&nbsp;LDL-C 5.0-6.4 (190-249)</label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="radio"><input type="radio" v-model="cholesterol" value="1">&nbsp;LDL-C 4.0-4.9 (155-189)</label><br>
      </div>
    </div>

    <hr>

    <h5 class="title is-5">DNA Analysis</h5>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="dnaAnalysis.a">
          Functional mutation of LDLR, apoB or PCSK9 gene
        </label>
      </div>
    </div>

    <hr>

    <div :class="'notification ' + notificationClass">
      <h3 class="title is-3">Score: {{ score }}</h3>
      <p class="subtitle is-5">{{ comment }}</p>
    </div>

  </div>
</template>

<script>
  export default {

    data() {
      return {

        familyHistory: {
          a: false,
          b: false,
          c: false,
          d: false,
        },

        clinicalHistory: {
          a: false,
          b: false,
        },

        physicalExamination: {
          a: false,
          b: false,
        },

        cholesterol: 0,

        dnaAnalysis: {
          a: false,
        },

        notificationClass: "",

      }
    },

    computed: {

      score() {

        let s = 0

        if (this.familyHistory.a || this.familyHistory.b) {
          s += 1
        }
        if (this.familyHistory.c || this.familyHistory.d) {
          s += 2
        }

        if (this.clinicalHistory.a) {
          s += 2
        }
        if (this.clinicalHistory.b) {
          s += 1
        }

        if (this.physicalExamination.a) {
          s += 6
        }
        if (this.physicalExamination.b) {
          s += 4
        }

        s += parseInt(this.cholesterol)

        if (this.dnaAnalysis.a) {
          s += 1
        }

        return s
      },

      comment() {

        let c = ""

        if (this.score < 3) {
          c = "Unlikely familial hypercholesterolemia"
          this.notificationClass = "is-success"
        }

        if (this.score >= 3 && this.score <= 5) {
          c = "Possible familial hypercholesterolemia"
          this.notificationClass = "is-warning"
        }

        if (this.score >= 6 && this.score <= 8) {
          c = "Probable familial hypercholesterolemia"
          this.notificationClass = "is-danger"
        }

        if (this.score > 8) {
          c = "Definite familial hypercholesterolemia"
          this.notificationClass = "is-danger"
        }


        return c

      }

    },


  }
</script>

<style scoped>

</style>
