<template>
  <div>
    <PageHeader
      title="Calculators"
      subtitle="..."
      :subnav="$store.state.nav.resources"
    />
    <PageSection>

      <div>
        <CalculatorModal>
          <template slot="open">
            <button class="button">Australian Absolute Cardiovascular Risk</button>
          </template>
          <template slot="calculator">
            <AACR/>
          </template>
        </CalculatorModal>
      </div>

      <div>
        <CalculatorModal>
          <template slot="open">
            <button class="button">CHA₂DS₂-VASc Score</button>
          </template>
          <template slot="calculator">
            <CHA2DS2_VASc/>
          </template>
        </CalculatorModal>
      </div>

      <div>
        <CalculatorModal>
          <template slot="open">
            <button class="button">Creatinine Clearance</button>
          </template>
          <template slot="calculator">
            <Creatinine_Clearance/>
          </template>
        </CalculatorModal>
      </div>

      <div>
        <CalculatorModal>
          <template slot="open">
            <button class="button">Dutch Lipid Clinical Network Score</button>
          </template>
          <template slot="calculator">
            <Dutch_Lipid/>
          </template>
        </CalculatorModal>
      </div>

      <div>
        <CalculatorModal>
          <template slot="open">
            <button class="button">HAS-BLED Score</button>
          </template>
          <template slot="calculator">
            <HAS_BLED/>
          </template>
        </CalculatorModal>
      </div>

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
