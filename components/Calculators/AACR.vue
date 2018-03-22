<template>
  <div>

    <h4 class="title is-4">Australian Absolute Cardiovascular Risk</h4>
    <p class="subtitle is-6"></p>

    <hr>

    <div class="field">
      <label class="label">Diabetes</label>
      <div class="control">
        <label class="radio"><input type="radio" v-model="diabetes" value="nonDiabetic">No</label>
        <label class="radio"><input type="radio" v-model="diabetes" value="diabetic">Yes</label>
      </div>
    </div>

    <div class="field">
      <label class="label">Sex</label>
      <div class="control">
        <label class="radio"><input type="radio" v-model="sex" value="male">&nbsp;Male</label>
        <label class="radio"><input type="radio" v-model="sex" value="female">&nbsp;Female</label>
      </div>
    </div>

    <div class="field">
      <label class="label">Smoker</label>
      <div class="control">
        <label class="radio"><input type="radio" v-model="smoker" value="nonSmoker">No</label>
        <label class="radio"><input type="radio" v-model="smoker" value="smoker">Yes</label>
      </div>
    </div>

    <div class="field">
      <label class="label">Aboriginal / Torres Strait Islander</label>
      <div class="control">
        <label class="radio"><input type="radio" v-model="ati" :value="false">No</label>
        <label class="radio"><input type="radio" v-model="ati" :value="true">Yes</label>
      </div>
    </div>

    <div class="field">
      <label class="label">Age Range</label>
      <div class="control">
        <div class="select">
          <select v-model="ageGroup">
            <option value="under75">65-74</option>
            <option value="under65">55-64</option>
            <option value="under55">45-54</option>
            <option value="under45" v-if="ati">35-44</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Blood Pressure (mm Hg)</label>
      <div class="control">
        <div class="select">
          <select v-model="bpGroup">
            <option value="bp120">< 130</option>
            <option value="bp140">130 - 149</option>
            <option value="bp160">150 - 169</option>
            <option value="bp179">170 - 179</option>
            <option value="high">> 179</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Total Cholesterol: HDL ratio</label>
      <div class="control">
        <div class="select">
          <select v-model="hdlGroup">
            <option value="0">4</option>
            <option value="1">5</option>
            <option value="2">6</option>
            <option value="3">7</option>
            <option value="4">8</option>
            <option value="high">< 8</option>
          </select>
        </div>
      </div>
    </div>


    <div :class="'notification ' + riskCSSClass">
      <div v-if="riskRange">
        <h3 class="title is-3"><span class="is-capitalized">{{ riskRange }}</span> ({{ riskLevel[riskIndex] }}) </h3>
        <p class="subtitle is-5">Risk level for 5 year cardiovascular (CVD) risk</p>
      </div>
      <div v-else>Pending...</div>
    </div>


  </div>
</template>

<script>
  export default {

    data() {

      return {

        diabetes: null,
        sex: null,
        smoker: null,
        ati: null,
        ageGroup: null,
        bpGroup: null,
        hdlGroup: null,

        riskLevel: ["<5%", "5-9%", "10-15%", "16-19%", "20-24%", "25-29%", ">30%"],

        risk: {

          nonDiabetic: {
            female: {
              under75: {
                nonSmoker: {
                  bp179: [2, 3, 3, 4, 4],
                  bp160: [2, 2, 2, 3, 3],
                  bp140: [1, 1, 2, 2, 2],
                  bp120: [1, 1, 1, 1, 2],
                },
                smoker: {
                  bp179: [4, 5, 5, 6, 6],
                  bp160: [3, 4, 4, 5, 5],
                  bp140: [2, 3, 3, 4, 4],
                  bp120: [2, 2, 2, 3, 3],
                },
              },
              under65: {
                nonSmoker: {
                  bp179: [1, 2, 2, 2, 3],
                  bp160: [1, 1, 2, 2, 2],
                  bp140: [1, 1, 1, 1, 2],
                  bp120: [0, 0, 1, 1, 1],
                },
                smoker: {
                  bp179: [3, 4, 4, 5, 5],
                  bp160: [2, 3, 3, 4, 4],
                  bp140: [2, 2, 2, 3, 3],
                  bp120: [1, 1, 2, 2, 2],
                },
              },
              under55: {
                nonSmoker: {
                  bp179: [1, 1, 1, 2, 2],
                  bp160: [0, 1, 1, 1, 1],
                  bp140: [0, 0, 0, 1, 1],
                  bp120: [0, 0, 0, 0, 0],
                },
                smoker: {
                  bp179: [2, 2, 3, 3, 4],
                  bp160: [1, 2, 2, 2, 3],
                  bp140: [1, 1, 1, 2, 2],
                  bp120: [0, 1, 1, 1, 1],
                },
              },
              under45: {
                nonSmoker: {
                  bp179: [0, 0, 1, 1, 1],
                  bp160: [0, 0, 0, 0, 1],
                  bp140: [0, 0, 0, 0, 0],
                  bp120: [0, 0, 0, 0, 0],
                },
                smoker: {
                  bp179: [1, 1, 2, 2, 2],
                  bp160: [1, 1, 1, 1, 1],
                  bp140: [0, 0, 1, 1, 1],
                  bp120: [0, 0, 0, 0, 0],
                },
              },
            },

            male: {
              under75: {
                nonSmoker: {
                  bp179: [4, 5, 5, 6, 6],
                  bp160: [3, 4, 4, 5, 5],
                  bp140: [2, 3, 3, 4, 4],
                  bp120: [2, 2, 2, 2, 3],
                },
                smoker: {
                  bp179: [6, 6, 6, 6, 6],
                  bp160: [5, 6, 6, 6, 6],
                  bp140: [4, 5, 5, 6, 6],
                  bp120: [3, 4, 4, 5, 5],
                },
              },
              under65: {
                nonSmoker: {
                  bp179: [3, 3, 4, 4, 4],
                  bp160: [2, 2, 3, 3, 4],
                  bp140: [1, 2, 2, 2, 2],
                  bp120: [1, 1, 1, 2, 2],
                },
                smoker: {
                  bp179: [5, 5, 6, 6, 6],
                  bp160: [4, 4, 5, 5, 6],
                  bp140: [3, 3, 4, 4, 5],
                  bp120: [2, 2, 3, 3, 3],
                },
              },
              under55: {
                nonSmoker: {
                  bp179: [1, 2, 2, 2, 3],
                  bp160: [1, 1, 2, 2, 2],
                  bp140: [1, 1, 1, 1, 1],
                  bp120: [0, 0, 1, 1, 1],
                },
                smoker: {
                  bp179: [3, 3, 4, 4, 5],
                  bp160: [2, 2, 3, 3, 4],
                  bp140: [1, 2, 2, 2, 3],
                  bp120: [1, 1, 1, 2, 2],
                },
              },
              under45: {
                nonSmoker: {
                  bp179: [0, 1, 1, 1, 1],
                  bp160: [0, 0, 0, 1, 1],
                  bp140: [0, 0, 0, 0, 0],
                  bp120: [0, 0, 0, 0, 0],
                },
                smoker: {
                  bp179: [1, 2, 2, 2, 2],
                  bp160: [1, 1, 1, 2, 2],
                  bp140: [0, 1, 1, 1, 1],
                  bp120: [0, 0, 0, 1, 1],
                },
              },
            },
          },

          diabetic: {
            female: {
              under75: {
                nonSmoker: {
                  bp179: [5, 5, 6, 6, 6],
                  bp160: [4, 4, 5, 5, 6],
                  bp140: [3, 3, 4, 4, 5],
                  bp120: [2, 2, 3, 3, 4],
                },
                smoker: {
                  bp179: [6, 6, 6, 6, 6],
                  bp160: [6, 6, 6, 6, 6],
                  bp140: [5, 6, 6, 6, 6],
                  bp120: [4, 4, 5, 5, 6],
                },
              },
              under65: {
                nonSmoker: {
                  bp179: [3, 4, 5, 5, 6],
                  bp160: [2, 3, 4, 4, 5],
                  bp140: [2, 2, 3, 3, 4],
                  bp120: [1, 2, 2, 2, 2],
                },
                smoker: {
                  bp179: [6, 6, 6, 6, 6],
                  bp160: [5, 5, 6, 6, 6],
                  bp140: [4, 4, 5, 5, 6],
                  bp120: [2, 3, 4, 4, 4],
                },
              },
              under55: {
                nonSmoker: {
                  bp179: [2, 3, 3, 4, 4],
                  bp160: [2, 2, 2, 3, 3],
                  bp140: [1, 1, 2, 2, 2],
                  bp120: [1, 1, 1, 1, 2],
                },
                smoker: {
                  bp179: [4, 5, 5, 6, 6],
                  bp160: [3, 4, 4, 5, 5],
                  bp140: [2, 3, 3, 4, 4],
                  bp120: [2, 2, 2, 3, 3],
                },
              },
              under45: {
                nonSmoker: {
                  bp179: [1, 1, 2, 2, 2],
                  bp160: [1, 1, 1, 2, 2],
                  bp140: [0, 1, 1, 1, 1],
                  bp120: [0, 0, 1, 1, 1],
                },
                smoker: {
                  bp179: [2, 3, 3, 4, 4],
                  bp160: [2, 2, 2, 3, 3],
                  bp140: [1, 2, 2, 2, 2],
                  bp120: [1, 1, 1, 1, 2],
                },
              },
            },

            male: {
              under75: {
                nonSmoker: {
                  bp179: [6, 6, 6, 6, 6],
                  bp160: [5, 5, 6, 6, 6],
                  bp140: [4, 4, 5, 5, 6],
                  bp120: [2, 3, 4, 4, 5],
                },
                smoker: {
                  bp179: [6, 6, 6, 6, 6],
                  bp160: [6, 6, 6, 6, 6],
                  bp140: [6, 6, 6, 6, 6],
                  bp120: [5, 6, 6, 6, 6],
                },
              },
              under65: {
                nonSmoker: {
                  bp179: [4, 5, 5, 6, 6],
                  bp160: [3, 4, 4, 5, 5],
                  bp140: [2, 3, 3, 4, 4],
                  bp120: [2, 2, 2, 3, 3],
                },
                smoker: {
                  bp179: [6, 6, 6, 6, 6],
                  bp160: [5, 6, 6, 6, 6],
                  bp140: [4, 5, 6, 6, 6],
                  bp120: [3, 4, 4, 5, 5],
                },
              },
              under55: {
                nonSmoker: {
                  bp179: [2, 3, 3, 4, 4],
                  bp160: [2, 2, 2, 3, 3],
                  bp140: [1, 2, 2, 2, 2],
                  bp120: [1, 1, 1, 1, 2],
                },
                smoker: {
                  bp179: [4, 5, 6, 6, 6],
                  bp160: [3, 4, 5, 5, 6],
                  bp140: [2, 3, 4, 4, 4],
                  bp120: [2, 2, 2, 3, 3],
                },
              },
              under45: {
                nonSmoker: {
                  bp179: [1, 1, 2, 2, 2],
                  bp160: [1, 1, 1, 1, 2],
                  bp140: [0, 1, 1, 1, 1],
                  bp120: [0, 0, 0, 0, 1],
                },
                smoker: {
                  bp179: [2, 3, 3, 4, 4],
                  bp160: [2, 2, 2, 3, 3],
                  bp140: [1, 1, 2, 2, 2],
                  bp120: [1, 1, 1, 1, 2],
                },
              },
            },
          }
        }
      }
    },

    computed: {

      riskIndex() {

        // very high bp or hdl
        if (this.bpGroup === "high" || this.hdlGroup === "high") {
          return 6
        }

        if (this.diabetes && this.sex && this.ageGroup && this.smoker && this.bpGroup && this.hdlGroup) {
          return this.risk[this.diabetes][this.sex][this.ageGroup][this.smoker][this.bpGroup][this.hdlGroup]
        }

        return null
      },

      riskRange() {

        if (this.riskIndex === null) {
          return null
        }

        if (this.riskIndex < 2) {
          return "low"
        }
        if (this.riskIndex == 2) {
          return "medium"
        }
        if (this.riskIndex > 2) {
          return "high"
        }

      },

      riskCSSClass() {

        if (!this.riskRange) {
          return ""
        }
        if (this.riskRange === "low") {
          return "is-success"
        }
        if (this.riskRange === "medium") {
          return "is-warning"
        }
        if (this.riskRange === "high") {
          return "is-danger"
        }
      },

    }
  }
</script>

<style scoped>

</style>
