import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router';
import ImageUploader from "vue-image-upload-resize";

Vue.use(ImageUploader);

Vue.config.productionTip = false

new Vue({      
  router: router,
  render: h => h(App),
}).$mount('#app')
