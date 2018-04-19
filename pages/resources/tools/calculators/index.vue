<template>
  <div>
    <PageHeader
      title="Calculators"
      subtitle="..."
      :subnav="$store.state.nav.resources"
    />
    <PageSection>

        <CalculatorModal>
          <template slot="open">
            <button class="button is-dark">Australian Absolute Risk</button>
          </template>
          <template slot="calculator">
            <AACR/>
          </template>
        </CalculatorModal>

      <CalculatorModal>
        <template slot="open">
          <button class="button is-dark">CHA₂DS₂-VASc Score</button>
        </template>
        <template slot="calculator">
          <CHA2DS2_VASc/>
        </template>
      </CalculatorModal>

        <CalculatorModal>
          <template slot="open">
            <button class="button is-dark">Creatinine Clearance</button>
          </template>
          <template slot="calculator">
            <Creatinine_Clearance/>
          </template>
        </CalculatorModal>

        <CalculatorModal>
          <template slot="open">
            <button class="button is-dark">Dutch Lipid Score</button>
          </template>
          <template slot="calculator">
            <Dutch_Lipid/>
          </template>
        </CalculatorModal>

        <CalculatorModal>
          <template slot="open">
            <button class="button is-dark">HAS-BLED Score</button>
          </template>
          <template slot="calculator">
            <HAS_BLED/>
          </template>
        </CalculatorModal>

    </PageSection>
  </div>
</template>

<script>

  import CalculatorModal from "~/components/Calculators/CalculatorModal"
  import AACR from "~/components/Calculators/AACR"
  import CHA2DS2_VASc from "~/components/Calculators/CHA2DS2_VASc"
  import Creatinine_Clearance from "~/components/Calculators/Creatinine_Clearance"
  import Dutch_Lipid from "~/components/Calculators/Dutch_Lipid"
  import HAS_BLED from "~/components/Calculators/HAS_BLED"


  export default {

    components: {
      CalculatorModal,
      AACR,
      CHA2DS2_VASc,
      Creatinine_Clearance,
      Dutch_Lipid,
      HAS_BLED,
    }
  }
</script>

<style scoped>
  .button {
    width: 16rem;
    margin-bottom: 1rem;
  }
</style>
