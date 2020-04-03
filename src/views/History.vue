<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <loader v-if='loading'/>

    <p v-else-if="!records.length" class="center">Записей еще нет.</p>

    <section v-else>
      <history-table :records="records"/>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader'
import HistoryTable from '@/components/HistoryTable'
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  components: {
    HistoryTable,
    Loader
  },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  methods: {
    setup () {
      this.renderChart({
        labels: ['red'],
        datasets: [{
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: [10, 20, 30, 40, 50, 60, 70]
        }]
      })
    }
  },
  async mounted () {
    // this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.setup()
    this.loading = false
  }
}
</script>
