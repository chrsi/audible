import axios from 'axios';
import * as _ from 'lodash';
import { TARGET, getConfigurationTarget } from './config/targetConfig';

/**
 * Provider key for injecting the configuration into the vue instance
 */
export const CONFIGURATION_PROVIDER = '$configuration';

export default {
  /**
   * Call an audible to configure the application during runtime.
   * @param {string} configurationUrl specifies the location of the configuration file
   * @param {object} vueInstanceOptions options for creating the vue application instance
   */
  call(configurationUrl, vueInstanceOptions, options = {}) {
    const configTarget = getConfigurationTarget(options.target);
    return axios.get(configurationUrl).then(({ data }) => {
      if (configTarget === TARGET.WINDOW) {
        window.$config = data;
      }

      const alteredVueOptions = _.clone(vueInstanceOptions, true);

      if (configTarget === TARGET.INJECT) {
        const preconfiguredProviders = alteredVueOptions.provide
          ? { ...alteredVueOptions.provide() }
          : {};

        alteredVueOptions.provide = () => ({
          [CONFIGURATION_PROVIDER]: data,
          ...preconfiguredProviders,
        });
      }

      return alteredVueOptions;
    }).catch((err) => {
      window.console.error(err);
      return vueInstanceOptions;
    });
  },
};
