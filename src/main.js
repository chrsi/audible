import Vue from 'vue'
import App from './App.vue'
import audible from '@csiber/audible'

Vue.config.productionTip = false

const options = {
  render: h => h(App),
};

audible.call({ url: '/appsettings.json' }, options).then(postSnapOptions => {
  const vm = new Vue(postSnapOptions);
  vm.$mount('#app')
});