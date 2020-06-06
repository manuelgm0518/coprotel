import Vue from 'vue'

//import BootstrapVue from 'bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../plugins/custom-bootstrap.scss'

Vue.use(BootstrapVue, {
  "BTooltip": {
    "boundary": "scrollParent",
    "boundaryPadding": 5,
    "customClass": null,
    "delay": 600,
    "variant": "secondary"
  }
})

Vue.use(IconsPlugin)