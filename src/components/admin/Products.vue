<template>
  <div class="text-center">
    <h2>Productos</h2>

    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Precio</th>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in products" :key="i">

          <td class="align-middle">{{ p.name }}</td>
          <td class="align-middle"><img :src="productImages + p.image" width="100"></td>

          <td class="align-middle">{{ p.price | currency }}</td>
          <td class="align-middle">{{ p.category }}</td>
          <td class="align-middle">
            <button class="btn btn-sm btn-warning mx-2" @click="handleEdit(p)">Editar</button>
            <button class="btn btn-sm btn-danger mx-2" @click="deleteProduct(p)">Borrar</button>
          </td>

        </tr>
      </tbody>
        <tfoot>
          <tr>
            <td colspan="6">
              <router-link class="btn btn-success float-center" to="/admin/products/agregar">Agregar Producto</router-link>
            </td>
          </tr>
        </tfoot>
    </table>
    <div class="d-flex justify-content-center">
      <ProductPagination />

    </div>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import ProductPagination from "../ProductPagination";

export default {
  components: { ProductPagination },
  computed: {
    ...mapState(["products","productImages"]),
  },
  methods: {
    ...mapMutations(["setCurrentCategory"]),
    ...mapActions(["setProductsByCategoryAction","deleteProduct"]),
    handleEdit(product) {
      this.$router.push(`/admin/products/editar/${product._id}`);
    }
  },
  created() {
    this.setCurrentCategory("todas");
    this.setProductsByCategoryAction("todas");
  },
};
</script>