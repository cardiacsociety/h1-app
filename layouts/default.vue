<template>
  <div>
    <LoadingModal/>
    <MessageModal/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>

  import Footer from "~/components/Footer"

  export default {

    components: {
      Footer,
    },

    middleware: "auth",
  }
</script>

<style>
  .footer {
    padding: 2rem 1.5rem;
  }
</style>
