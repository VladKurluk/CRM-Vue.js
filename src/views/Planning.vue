<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill }} UAH</h4>
    </div>

    <loader v-if='loading'/>

    <p v-else-if="!categories.length" class="center">Категорий еще нет. <router-link to="/categories">Создать категорию.</router-link></p>

    <section v-else>
      <div
        v-for="cat in categories"
        :key="cat.id"
      >
        <p>
          <strong>{{ cat.title }}:</strong>
          {{cat.spend}} из {{cat.limit}}
        </p>
        <div class="progress" >
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader'
import { mapGetters } from 'vuex'

export default {
  name: 'Planing',
  components: {
    Loader
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    // В переменной categories лежат данные из БД,
    // ниже я добавлю дополнительне поля {percent, progressPercent, progressColor} 
    // и положу результат в модель
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      return {
        ...cat,
        percent,
        progressPercent,
        progressColor,
        spend
      }
    })
    this.loading = false
  }
}
</script>
