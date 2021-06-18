<template>
  <div class="float-right text-white m-3 h6">
    <span v-if="itemCount > 0">
      {{itemCount}} item(s) {{ totalPrice | currency}}
    </span>

    <span v-else>
      El Carro esta vacio.
    </span>
    <router-link class="text-white" v-if="itemCount > 0" to="/cart">
      <i class="fa fa-shopping-cart"></i>
    </router-link>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice",
    }),
  },
};
</script>