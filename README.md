# 🏈️ Audible.js
Audible.js is a tool for Vue.js to enable stage dependant deployments.

> Audibles are used in american football when the quaterback wants to change the play during the pre snap. Just like in football, audible.js changes the configuration during runtime just before it reaches the client (which would be the snap in this case).

# What it does
## Problem Description
Configuration in Vue.js is mostly done using "environment files" (eg. [.env.development](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables)). The configuration is chose using environment variables and backed into the javascript bundle with webpack. This is a quick and fine way to provide configuration for Vue.js applications. But it has one drawback: Deployments for different stages require a separate build/bundle for each one. This makes it especially hard for continous integration.

Drawbacks of multiple bundles for Continuous :
* The time to release takes longer, because we need multiple build runs for the stages.
* We need to maintain multiple build pipelines.
* A successful test of the test stage build does not mean we have a working prod stage build. We can't be 100% certain since both build artifacts come from different pipelines.

## Solution
To overcome this issue, audible.js changes the configuration during runtime. Before the vue.js instance is created, audible tries to gather the configuration from a specified endpoint and "bake" it into the application.

# Instruction
Use the `audible.call` function to change the configuration during runtime.

```js
audible.call('/configuration/appsettings.json', () => new Vue(options));
```