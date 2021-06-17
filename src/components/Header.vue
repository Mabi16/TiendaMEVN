<template>
  <nav
    class="
      navbar navbar-expand-md
      border-bottom border-light
      navbar-dark
      bg-info
      sticky-top
      text-white
    "
  >
    <router-link class="navbar-brand h5 p-3" to="/">TiendaBD</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-for="(p, i) in pages" :key="i">
          <router-link
            class="nav-link text-white h6 p-3"
            v-if="p.slug != 'inicio'"
            :to="'/' + p.slug"
          >
            {{ p.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["pages"]),
  },
};
</script>