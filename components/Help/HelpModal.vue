<template>
  <div>
    <!--click wrapper as cannot listen for click on a slot-->
    <span @click="openModal">
      <slot name="open">open</slot>
    </span>
    <div class="modal" :class="{'is-active': open}">
      <div class="modal-background"></div>
      <div class="modal-content">

        <article class="message is-info">
          <div class="message-header">
            <div>Help Item: {{ name }}</div>
            <button class="delete" aria-label="close" @click="closeModal"></button>
          </div>
          <div class="message-body">
            <h5 class="title is-5 is-marginless">{{ item.title }}</h5>
            <p>{{ item.explanation }}</p>
          </div>
        </article>

      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>

  export default {

    props: {
      name: {
        type: String,
        Required: true,
      }
    },

    data() {

      return {
        open: false,
      }

    },

    computed: {
      item() {
       return this.$store.state.help.items[this.name] || this.$store.state.help.items.NOT_FOUND
         .then(res => {
           i = res
         })
         .catch(err => {
           console.log(err)
         })

        console.log(i)
        return i
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

    mounted() {

      // listen for a 'close' event
      this.$root.$on('close', () => {
        this.closeModal()
      })

    },
  }
</script>

<style scoped>
</style>
