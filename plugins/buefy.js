import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

// buefy is currently not being loaded because I could not get the customisations to work
// via custom.scss ... however I could get them to work by pasting the example customisation
// into the script tag of the default layout??
// todo investigate this further
Vue.use(Buefy)
