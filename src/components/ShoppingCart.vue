<template>
  <div class="row mt-3">
    <CategoryList />
    <div class="col-9">
      <h2 class="display-4">Tu Carrito</h2>

      <table class="table table-bordered shadow-sm">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="itemCount == 0">
            <td class="text-center" colspan="5">Tu carrito esta vacio. <i class="fa fa-frown-o"></i></td>
          </tr>
          <tr v-else v-for="(c, i) in cart" :key="i">
            <td>{{ c.product.name }}</td>
            <td>{{ c.quantity }}</td>
            <td>
              <button class="btn small btn-primary mx-1" @click="handleAddProduct(c.product)">+</button>
              <button class="btn small btn-warning mx-1" @click="handleSubtractProduct(c.product._id)">-</button>
              <button class="btn small btn-danger mx-1"  @click="handleRemoveProduct(c.product._id)">Borrar</button>
            </td>
            <td>{{ c.product.price | currency }}</td>
            <td>{{ (c.product.price * c.quantity) | currency }}</td>
          </tr>
        </tbody>
        <tfoot v-if="itemCount > 0">
          <tr>
            <td colspan="5" class="text-end">
              <h4>Total: {{ totalPrice | currency }}</h4>
            </td>
          </tr>
          <tr>
            <td colspan="5">
              <button class="btn btn-danger float-start" @click="handleClearCart">
                Limpiar carrito <i class="fa fa-trash"></i>
              </button>
              <router-link to="/checkout" class="btn btn-primary float-end"
                >Comprar <i class="fa fa-angle-right"></i>
              </router-link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CategoryList from "./CategoryList";

export default {
  components: { CategoryList },

  computed: {
    ...mapState({ cart: (state) => state.cart.cart }),
    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice",
    }),
  },
  methods: {
    ...mapActions({
      clearCartData: "cart/clearCartData"
    }),
    ...mapMutations({
      addProduct: "cart/addProduct",
      subtractProduct: "cart/subtractProduct",
      removeProduct: "cart/removeProduct",
    }),
    handleAddProduct(product) {
      this.addProduct(product);
    },
    handleSubtractProduct(id) {
      this.subtractProduct(id);
    },
    handleRemoveProduct(id) {
      this.removeProduct(id);
    },
    handleClearCart() {
      this.clearCartData();
    }
  },
};
</script>