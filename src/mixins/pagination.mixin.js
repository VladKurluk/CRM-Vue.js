import _ from 'lodash'

export default {
  data: () => ({
    page: 1,
    pageSize: 6,
    pageCount: 0,
    allItems: [],
    items: []
  }),
  methods: {
    setupPagination (allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHendler (page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  },
  mounted () {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page)
    } else {
      this.page = 1
    }
  }
}
