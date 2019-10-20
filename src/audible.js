import axios from 'axios';

export default {
  call(settingsUrl, vueInstanceFactory) {
    axios.get(settingsUrl).then(({ data }) => {
      window.$config = data;
      vueInstanceFactory();
    }).catch((err) => {
      window.console.error(err);
    });
  },
};
