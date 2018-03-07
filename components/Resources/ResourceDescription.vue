<template>
    <div>
        <div class="description-container" :class="{truncate: truncate && !expanded, expanded: truncate && expanded}">
            <slot>no further details available</slot>
            <div class="fadeout" v-if="truncate && !expanded" @click="expanded = !expanded"></div>
        </div>
        <a class="toggle" v-if="truncate && !expanded" @click="expanded = true">
            more...
        </a>
        <a class="toggle" v-if="truncate && expanded" @click="expanded = false">
            ...less
        </a>
    </div>
</template>

<script>
  export default {

    props: ['truncate'],

    data() {
      return {
        trucate: false,
        expanded: false
      }
    },

  }
</script>

<style scoped>
    .description-container {
        position: relative;
    }

    .expanded {
        max-height: none;
        overflow: visible;
    }

    .truncate {
        max-height: 60px;
        overflow: hidden;
    }

    .fadeout {
        position: absolute;
        bottom: 0;
        height: 70%;
        width: 100%;
        background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 90%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(95%, rgba(255, 255, 255, 1)));
        background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 90%);
        background: -o-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 90%);
        background: -ms-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 90%);
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 90%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#ffffff', GradientType=0);
    }

    .fadeout:hover {
        cursor: pointer;
    }

    .toggle {
        display: inline-block;
    }
    .toggle:hover {
        cursor: pointer;
    }

</style>