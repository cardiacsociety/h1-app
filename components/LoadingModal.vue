<template>
    <div class="modal" :class="{'is-active': open}" style="z-index: 99;">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="spinner">
                <i class="fas fa-5x fa-sync fa-spin"></i>
            </div>
        </div>
    </div>
</template>

<script>
  export default {

    data() {
      return {
        open: false
      }
    },

    methods: {
      openModal() {
        this.open = true
      },
      closeModal() {

        // fake network delay
        setTimeout(() => {
          this.open = false
        }, 3000)
      },
    },

    mounted() {
      this.$root.$on("loading", (show) => {
        if (show) {
          this.openModal()
        } else {
          this.closeModal()
        }
      })
    },

  }
</script>

<style scoped>
    .spinner {
        padding: 40px;
        text-align: center;
        color: lightgrey;
        border: solid 1px hotpink;
    }
</style>