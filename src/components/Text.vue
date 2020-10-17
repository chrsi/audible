<template>
  <p>{{ value }}</p>
</template>

<script>
export default {
  name: 'AppText',
  props: {
    value: String
  }
}
</script>

<style scoped>
p {
  size: 20em;
}
</style>
