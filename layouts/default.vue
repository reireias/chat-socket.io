<template>
  <v-app>
    <v-app-bar app fixed max-height="64">
      <v-toolbar-title>Example Chat Application with Firebase</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!['/', '/login'].includes($route.path)"
        class="toolbar-button"
        outlined
        nuxt
        to="/"
        >top</v-btn
      >
      <v-btn v-if="user" class="toolbar-button" outlined href="/logout"
        >logout</v-btn
      >
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user']),
  },
}
</script>

<style lang="scss">
.toolbar-button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
