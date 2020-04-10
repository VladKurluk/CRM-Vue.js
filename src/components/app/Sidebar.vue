<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
        v-for="(link, index) in links"
        :key="index"
    >
      <a href="" class="waves-effect waves-orange pointer">{{ link.title | localize}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: 'Menu_Bill',
        url: '/',
        exact: true
      },
      {
        title: 'Menu_History',
        url: '/history'
      },
      {
        title: 'Menu_Planning',
        url: '/planning'
      },
      {
        title: 'Menu_NewRecord',
        url: '/record'
      },
      {
        title: 'Menu_Categories',
        url: '/categories'
      }
    ]
  }),
  props: ['value']
}
</script>
