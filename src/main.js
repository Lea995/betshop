import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'


const eventBus = new Vue({
  data: function() {
      return {
          selectedMarker: null,
          infoOpened: false
      }
  }
});

Vue.mixin({
  data: function() {
      return {
        eventBus: eventBus,
      }
  }
});

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDchuaAaKfvm1jtqt40LE2KQAifsCNkLbQ',
    libraries: 'places',
    autobindAllEvents: true
    // This is required if you use the Autocomplete plugin

    // libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    // If you want to set the version, you can do so:
    // v: '3.26',
  },

  // If you intend to programmatically custom event listener code
  // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed='someFunc'>`)
  // you might need to turn this on.
  // autobindAllEvents: false,

  // If you want to manually install components, e.g.
  // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)
  // then set installComponents to 'false'.
  // If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})
new Vue({
  render: h => h(App),
}).$mount('#app')
