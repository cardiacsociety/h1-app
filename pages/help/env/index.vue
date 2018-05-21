<template>
    <div>
        <h1>Env Vars</h1>
        <p>
            REST_API_BASE_URL: <b>{{ REST_API_BASE_URL }}</b>
        </p>
        <p>
            GRAPHQL_API_BASE_URL: <b>{{ GRAPHQL_API_BASE_URL }}</b>
        </p>
        <p>
            ALGOLIA_APP_ID: <b>{{ ALGOLIA_APP_ID }}</b>
        </p>
        <p>
            ALGOLIA_DIRECTORY_INDEX: <b>{{ ALGOLIA_DIRECTORY_INDEX }}</b>
        </p>
        <p>
            ALGOLIA_RESOURCES_INDEX: <b>{{ ALGOLIA_RESOURCES_INDEX }}</b>
        </p>
        <p>
            INVALID_EMAIL_STRINGS: <b>{{ INVALID_EMAIL_STRINGS }}</b>
        </p>
    </div>
</template>

<script>
  export default {
    name: "index",

    data() {
      return {
        REST_API_BASE_URL: process.env.REST_API_BASE_URL,
        GRAPHQL_API_BASE_URL: process.env.GRAPHQL_API_BASE_URL,
        ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
        ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
        ALGOLIA_DIRECTORY_INDEX: process.env.ALGOLIA_DIRECTORY_INDEX,
        ALGOLIA_RESOURCES_INDEX: process.env.ALGOLIA_RESOURCES_INDEX,
        INVALID_EMAIL_STRINGS: process.env.INVALID_EMAIL_STRINGS,
      }
    }
  }
</script>

<style scoped>

</style>