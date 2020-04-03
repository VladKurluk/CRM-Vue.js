<template>
  <div>
    <loader v-if='loading'/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
              'red': record.type === 'outcome',
              'green': record.type === 'income'
            }">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Запись с id = {{ $route.params.id}} не найдена в базе</p>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader'
export default {
  name: 'detail',
  components: {
    Loader
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecord', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false
  }
}
</script>
