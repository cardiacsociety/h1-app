<template>
  <div>
    <!--click wrapper as cannot listen for click on a slot-->
    <span @click="openModal">
      <slot name="open">open</slot>
    </span>
    <div class="modal" :class="{'is-active': open}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <slot name="calculator">no calculator component</slot>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>
  import ActivityForm from "~/components/Activity/ActivityForm"

  export default {
    props: {

    },

    components: {
      ActivityForm,
    },

    data() {
      return {
        open: false,
      }
    },

    methods: {

      openModal() {
        this.open = true
      },

      closeModal() {
        this.open = false
      },

    },

  }
</script>

<style scoped>
</style>
