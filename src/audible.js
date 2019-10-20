import axios from 'axios';

export default {
  /**
   * Call an audible to configure the application during runtime.
   * @param {string} configurationUrl specifies the location of the configuration file
   * @param {fn} vueInstanceFactory factory creating the vue application instance
   */
  call(configurationUrl, vueInstanceFactory) {
    axios.get(configurationUrl).then(({ data }) => {
      window.$config = data;
      vueInstanceFactory();
    }).catch((err) => {
      window.console.error(err);
    });
  },
};
