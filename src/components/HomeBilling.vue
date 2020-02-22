<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line">
          <span>{{ base }} UAH</span>
        </p>
        <p class="currency-line" v-for="(rate, index) in rates" :key="index">
          <span>{{Math.floor(base / rate.buy)}} {{rate.ccy}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Billing',
  props: ['rates'],
  computed: {
    base () {
      return this.$store.getters.info.bill
    }
  }
}
</script>
