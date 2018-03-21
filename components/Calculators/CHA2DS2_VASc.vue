<template>
  <div>

    <h4 class="title is-4">CHA₂DS₂-VASc Score</h4>
    <p class="subtitle is-6">Calculates stroke risk for patients with atrial fibrillation.</p>
    <hr>

    <div class="field">
      <label class="label">Age</label>
      <p class="help"></p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="age" value=0><65</label>
        <label class="radio"><input type="radio" v-model="age" value=1>65-74</label>
        <label class="radio"><input type="radio" v-model="age" value=2>75+</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Sex</label>
      <p class="help"></p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="sex" value="0">Male</label>
        <label class="radio"><input type="radio" v-model="sex" value="1">Female</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Congestive Heart Failure history</label>
      <p class="help"></p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="chf" value="0">No</label>
        <label class="radio"><input type="radio" v-model="chf" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Hypertension history</label>
      <p class="help"></p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="ht" value="0">No</label>
        <label class="radio"><input type="radio" v-model="ht" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Stroke/TIA/TE history</label>
      <p class="help"></p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="stt" value="0">No</label>
        <label class="radio"><input type="radio" v-model="stt" value="2">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Vascular Disease history</label>
      <p class="help"></p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="vd" value="0">No</label>
        <label class="radio"><input type="radio" v-model="vd" value="1">Yes</label>
      </div>
    </div>

    <hr>

    <div class="field">
      <label class="label">Diabetes history</label>
      <p class="help"></p>
      <div class="control">
        <label class="radio"><input type="radio" v-model="diabetes" value="0">No</label>
        <label class="radio"><input type="radio" v-model="diabetes" value="1">Yes</label>
      </div>
    </div>


    <hr>

    <div :class="{'notification' : true, 'is-success': score == 0, 'is-warning': score > 0, 'is-danger': score >= 5}">
      <h3 class="title is-3">Score: {{ score }}</h3>
      <p class="subtitle is-5">Risk: {{ risk[score] }}%</p>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        age: 0,
        sex: 0,
        chf: 0,
        ht: 0,
        stt: 0,
        vd: 0,
        diabetes: 0,

        // annual risk %, score is the index
        risk: [0, 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 12.5, 15.2]
      }
    },

    computed: {
      score() {
        return (
          parseInt(this.age) +
          parseInt(this.sex) +
          parseInt(this.chf) +
          parseInt(this.ht) +
          parseInt(this.stt) +
          parseInt(this.vd) +
          parseInt(this.diabetes)
        )
      }
    }
  }
</script>

<style scoped>

</style>
