<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading" />

    <div v-else class="row">
      <billing :rates="currency" />
      <currency :rates="currency"/>
    </div>
  </div>
</template>

<script>
import Billing from '@/components/HomeBilling.vue'
import Currency from '@/components/HomeCurrency.vue'

export default {
  name: 'home',
  metaInfo () {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.$title('Menu_Bill')
    }
  },
  components: {
    Billing,
    Currency
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  }
}
</script>
