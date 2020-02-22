<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс покупки</th>
              <th>Курс продажи</th>
              <th>Время</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(rate, index) in rates" :key="index">
              <td>{{rate.ccy}}</td>
              <td>{{rate.buy}}</td>
              <td>{{rate.sale}}</td>
              <td>{{ date | date('time') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Currency',
  props: ['rates'],
  data: () => ({
    date: new Date()
  })
}
</script>
