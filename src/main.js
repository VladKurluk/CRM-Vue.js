import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import VueMeta from 'vue-meta'
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import tooltipDirective from '@/directives/tooltip.directive'
import Loader from '@/components/app/Loader'
import Paginate from 'vuejs-paginate'
import firebaseConfig from '@/utils/firebase.config'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
