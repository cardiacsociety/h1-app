<template>
  <ActivityAddModal>
    <template slot="open">
      <button :class="buttonClass" :style="buttonStyle">
        <slot>
          <template>
            <i class="fa fa-plus"></i>&nbsp;activity
          </template>
        </slot>
      </button>&nbsp;
    </template>
  </ActivityAddModal>
</template>

<script>
    import ActivityAddModal from "~/components/Activity/ActivityAddModal"

    export default {
      components: {
        ActivityAddModal
      },
      props: {
        buttonClass: {
          type: String,
          default: "button is-success",
        },
        buttonStyle: {
          type: String,
        }
      }
    }
</script>

<style scoped>

</style>
