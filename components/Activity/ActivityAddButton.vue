<template>
  <ActivityAddModal>
    <template slot="open">
      <button class="button is-success"><i class="fa fa-plus"></i>&nbsp;activity</button>&nbsp;
    </template>
  </ActivityAddModal>
</template>

<script>
    import ActivityAddModal from "~/components/Activity/ActivityAddModal"

    export default {
      components: {
        ActivityAddModal
      }
    }
</script>

<style scoped>

</style>
