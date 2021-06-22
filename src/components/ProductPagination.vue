<template>
  <nav class="mt-5">
    <ul class="pagination">
      <li class="page-item" v-if="currentPage != 1" @click="getProducts(currentPage-1)">
        <button class="btn btn-secondary mx-1"><i class="fa fa-angle-left"></i> Atras</button>
      </li>
      <li class="page-item" v-for="(p, i) in pageCount" :key="i" @click="getProducts(p)">
        <button
          class="btn mx-1"
          :class="[i + 1 == currentPage ? 'btn-primary' : 'btn-secondary']"
        >
          {{ p }}
        </button>
      </li>
      <li class="page-item" v-if="currentPage != pageCount" @click="getProducts(currentPage+1)">
        <button class="btn btn-secondary mx-1">Siguiente <i class="fa fa-angle-right"></i></button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["pageCount", "currentPage"]),
  },
  methods: {
    ...mapActions(["setProductsByCategoryPaginationAction"]),
    ...mapMutations(["setCurrentPage"]),
    getProducts(page) {
      this.setCurrentPage(page);
      this.setProductsByCategoryPaginationAction(page);
    },
  },
};
</script>