<template>
  <div id="app">
    <component :is='layout'>
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/auth/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  components: {
    EmptyLayout,
    MainLayout
  },
  computed: {
    layout () {
      // console.log(this.$route.meta)
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
}
</script>

<style lang="css">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/css/index.css';

</style>
