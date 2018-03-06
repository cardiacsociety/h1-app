<template>
    <v-list-tile :to="to" exact @click="navEvent('close')">
        <v-list-tile-action>
            <v-icon>{{ icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>
                <slot>Title</slot>
            </v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
    export default {
      props: ['to', 'icon', 'title'],
    }
</script>

<style>
</style>