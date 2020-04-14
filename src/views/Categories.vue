<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Categories' | localize}}</h3>
    </div>
    <section>
      <loader v-if='loading'/>
      <div v-else class="row">
        <category-create @created="addNewCategory" />
        <category-edit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">Категорий еще нет.</p>
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
  metaInfo () {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.$title('Menu_Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    CategoryCreate,
    CategoryEdit,
    Loader
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const index = this.categories.findIndex(c => c.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
