<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if='loading'/>
      <div v-else class="row">
        <category-create @created="addNewCategory" />
        <category-edit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import Loader from '@/components/app/Loader'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true
  }),
  components: {
    CategoryCreate,
    CategoryEdit,
    Loader
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
      console.log(this.categories)
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
