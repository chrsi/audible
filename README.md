# 🏈️ Audible.js
Audible.js is a tool for Vue.js to enable stage dependant deployments.

> Audibles are used in american football when the quaterback wants to change the play during the pre snap. Just like in football, audible.js changes the configuration during runtime just before it reaches the client (which would be the snap in this case).

# What it does
## Problem Description
Configuration in Vue.js is mostly done using "environment files" (eg. [.env.development](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables)). The configuration is chosen using environment variables and baked into the javascript bundle with webpack. This is a quick and fine way to provide configuration for Vue.js applications. But it has one major drawback: Deployments for different stages require a separate build/bundle for each stage. This makes it especially hard for continous integration.

Drawbacks of multiple bundles :
* The time to release takes longer, because we need multiple build pipeline runs.
* We need to maintain multiple build pipelines.
* A successful test of the test stage build does not mean we have a working prod stage build. We can't be 100% certain since both build artifacts come from different pipelines.

## Solution
To overcome this issue, audible.js changes the configuration during runtime. Before the vue.js instance is created, audible tries to gather the configuration from a specified endpoint and "bake" it into the application.

# Instruction
Use the `audible.call` function to change the configuration during runtime.

```js
audible.call('/configuration/appsettings.json', options).then(postSnapOptions => {
  const vm = new Vue(postSnapOptions);
});
```

## Choose your configuration target
The configuration target defines where the configuration will be stored. There are currently 2 targets supported:
* window object
* provide/inject (Vue)

### window
This target stores the configuration object to the global window object.
```js
audible.call('/configuration/appsettings.json', options, { target: 'window' }).then(postSnapOptions => {
  const vm = new Vue(postSnapOptions);
});
```

Usage:
```js
console.log(window.apiUrl);
```

### provide/inject
This target provides the configuration with the provide/inject mechanism of Vue.
```js
audible.call('/configuration/appsettings.json', options, { target: 'inject' }).then(postSnapOptions => {
  const vm = new Vue(postSnapOptions);
});
```

Usage:
```js
import { CONFIGURATION_PROVIDER } from 'audible';

Vue.component('sample', {
  inject: { config: CONFIGURATION_PROVIDER },
  mounted: function() {
    console.log(this.config.apiUrl);
  }
});
```
