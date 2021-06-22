<template>
  <div class="col-3">
    <h3>Categorias</h3>

    <ul class="nav flex-column mt-3">
      <li class="nav-item">
        <router-link class="nav-link" to="/categorias/todas">Todas</router-link>
      </li>
      <li class="nav-item" v-for="(c, i) in categories" :key="i"> <!-- lista el total de categorias de la BD en mongo-->
        <router-link class="nav-link" :to="'/categorias/' + c.slug"> <!-- Rutea a la url, Ej: "localhost/categorias/computadoras "-->
          {{ c.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["categories"]),
  },
};
</script>

<style scoped>
a.router-link-active {
  border: 1px solid #eb4d55!important;
  border-radius: 10px;
  border-color: #eb4d55!important;
  background:white!important;
  color: #eb4d55;
}
</style>