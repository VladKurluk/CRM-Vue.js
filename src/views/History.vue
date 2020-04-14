<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_History' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <loader v-if='loading'/>

    <p v-else-if="!records.length" class="center">Записей еще нет.</p>

    <section v-else>
      <history-table :records="items"/>
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHendler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import Loader from '@/components/app/Loader'
import HistoryTable from '@/components/HistoryTable'
import { Line } from 'vue-chartjs'

export default {
  name: 'history',
  metaInfo () {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.$title('Menu_History')
    }
  },
  mixins: [paginationMixin],
  extends: Line,
  components: {
    HistoryTable,
    Loader
  },
  data: () => ({
    loading: true,
    records: []
  }),
  methods: {
    setup (categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))
      this.renderChart({
        labels: this.records.map(c => c.date),
        datasets: categories.map(cat => {
          return {
            label: cat.title,
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            borderCapStyle: 'round',
            pointBorderColor: 'orange',
            pointBackgroundColor: 'rgba(255,150,0,0.5)',
            borderWidth: 3,
            showLine: true,
            spanGaps: true,
            lineStyle: 'solid',
            width: 2,
            data: this.records.map(r => {
              if (r.categoryId === cat.id && r.type === 'outcome') {
                return r.amount
              }
            })
          }
        })
      })
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)
    this.loading = false
  }
}
</script>
