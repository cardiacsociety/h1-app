<template>
    <div>
        <PageHeader
                title="Help"
                subtitle="FAQ and help topics"
        />
        <PageSection>
            <p>This is the help section</p>

            <p class="notification is-success">
                <IconLoader icon="checkCircleSolid" size="4rem"/>
                <IconLoader icon="checkCircleRegular" size="4rem"/>
                <IconLoader icon="exclamationTriangle" size="4rem"/>
                <IconLoader icon="exclamation" size="4rem"/>
                <IconLoader icon="thumbsDownSolid" size="4rem"/>
                <IconLoader icon="thumbsDownRegular" size="4rem"/>
            </p>


            <p class="buttons">
                <button class="button is-success"
                        @click="message({class: 'success', title: 'Saved!', body: 'this message should close in 5 seconds', ttl: 5000})">
                    success message
                </button>

                <button class="button is-warning"
                        @click="message({class: 'warning', body: 'this warning should close in 3 seconds', ttl: 3000})">
                    warning message
                </button>

                <button class="button is-danger"
                        @click="message({class: 'error', body: 'this error should close in 10 seconds', ttl: 10000})">
                    error message
                </button>

                <button class="button is-info" @click="message({class: 'info', body: 'this info box will not self close'})">
                    info message
                </button>
            </p>

        </PageSection>
    </div>
</template>

<script>

  import IconLoader from "~/components/IconLoader"

  export default {

    components: {
      IconLoader,
    },

    methods: {
      message(msg) {
        this.$root.$emit('message', msg)
      }
    }
  }

</script>

<style scope>

</style>
