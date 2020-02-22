<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <billing />
      <currency />
    </div>
  </div>
</template>

<script>
import Billing from '@/components/HomeBilling.vue'
import Currency from '@/components/HomeCurrency.vue'

export default {
  name: 'home',
  components: {
    Billing,
    Currency
  }
}
</script>
