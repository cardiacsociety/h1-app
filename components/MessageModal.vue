<template>
    <div class="modal" :class="{'is-active': open}" style="z-index: 999;">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="notification" :class="boxClass">
                <button class="delete is-large" aria-label="close" @click="closeModal"></button>

                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item">
                            <span class="is-size-3">
                                <IconLoader v-bind="iconLoaderObject"/>
                            </span>
                        </div>
                        <div class="level-item padding-bottom">
                            <span class="is-capitalized is-size-3">{{ boxTitle }}</span>
                        </div>
                    </div>
                </div>
                <p>{{ messageBody }}</p>
                <template v-if="messageArray">
                    <ul>
                        <li v-for="msg in messageArray">
                            {{ msg }}
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
</template>

<script>

  import IconLoader from "~/components/IconLoader"

  export default {

    components: {
      IconLoader,
    },

    data() {
      return {
        open: false,

        messageTypes: {
          success: {
            boxClass: "is-success",
            iconName: "checkCircleSolid",
          },
          warning: {
            boxClass: "is-warning",
            iconName: "exclamationTriangle",
          },
          error: {
            boxClass: "is-danger",
            iconName: "thumbsDownRegular",
          },
          info: {
            boxClass: "is-info",
            iconName: "infoCircleSolid",
          }
        },

        messageType: "info",
        messageTitle: "",
        messageBody: "",
        messageArray: [],
        messageMilliseconds: 0,
        timerId: null,
      }
    },

    computed: {

      boxClass() {
        return this.messageTypes[this.messageType].boxClass
      },

      iconLoaderObject() {
        return {
          icon: this.messageTypes[this.messageType].iconName,
        }
      },

      boxTitle() {
        return this.messageTitle || this.messageType
      }
    },

    methods: {
      openModal() {
        this.open = true
      }
      ,
      closeModal() {
        this.open = false
        this.reset()
      }
      ,
      reset() {
        clearTimeout(this.timerId)
        this.notificationClass = ""
        this.iconClass = []
        this.messageBody = ""
        this.messageMilliseconds = 0
      }
    },

    mounted() {

      this.$root.$on("message", (msg) => {
        this.reset()
        this.messageType = msg.class
        this.messageTitle = msg.title
        this.messageBody = msg.body
        this.messageArray = msg.list
        this.messageMilliseconds = msg.ttl
        this.openModal()

        if (this.messageMilliseconds > 0) {
          this.timerId = setTimeout(() => {
            this.closeModal()
          }, this.messageMilliseconds)
        }
      })
    },

  }
</script>

<style scoped>
    .padding-bottom {
        padding-bottom: 0.5rem;
    }

</style>