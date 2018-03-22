<template>
  <div>
    <PageHeader
      title="Calculators"
      subtitle="..."
      :subnav="$store.state.nav.resources"
    />
    <PageSection>

      <div class="box">
        <CalculatorModal>
          <template slot="open">
            <a class="">Australian Absolute Cardiovascular Risk</a>
          </template>
          <template slot="calculator">
            <AACR/>
          </template>
        </CalculatorModal>
      </div>

      <div class="box">
        <CalculatorModal>
          <template slot="open">
            <a class="">CHA₂DS₂-VASc Score</a>
          </template>
          <template slot="calculator">
            <CHA2DS2_VASc/>
          </template>
        </CalculatorModal>
      </div>

      <div class="box">
        <CalculatorModal>
          <template slot="open">
            <a class="">Creatinine Clearance</a>
          </template>
          <template slot="calculator">
            <Creatinine_Clearance/>
          </template>
        </CalculatorModal>
      </div>

      <div class="box">
        <CalculatorModal>
          <template slot="open">
            <a class="">Dutch Lipid Clinical Network Score</a>
          </template>
          <template slot="calculator">
            <Dutch_Lipid/>
          </template>
        </CalculatorModal>
      </div>

      <div class="box">
        <CalculatorModal>
          <template slot="open">
            <a class="">HAS-BLED Score</a>
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
