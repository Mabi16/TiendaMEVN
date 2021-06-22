<template>
  <div class="row">
    <div class="col-12">
      <div class="form-group m-2">
        <label for="">Nombre</label>
        <input type="text" class="form-control" v-model="$v.order.name.$model" placeholder="Ingresa tu nombre"/>
        <validation-error :validation="$v.order.name" />
      </div>

      <div class="form-group m-2">
        <label for="">E-mail</label>
        <input type="text" class="form-control" v-model="$v.order.email.$model" placeholder="E-mail"/>
        <validation-error :validation="$v.order.email" />
      </div>

      <div class="form-group m-2">
        <label for="">Direccion</label>
        <input type="text" class="form-control" v-model="$v.order.address.$model" placeholder="Direccion"/>
        <validation-error :validation="$v.order.address" />
      </div>
    </div>

    <div class="col-12 text-center">
      <router-link class="btn btn-secondary m-1" to="/cart">
        Atras
      </router-link>
      <button class="btn btn-warning m-1" @click="submitOrder">
        Realizar pedido
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import ValidationError from "./ValidationError";
import {required, email} from "vuelidate/lib/validators";

export default {
  components:{
    ValidationError
  },
  data() {
    return {
      order: {
        name: "Marco",
        email: "MarcoA.Itl@outlook.com",
        address: "Calle TecLaguna 123",
      },
    };
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
    }),
    ...mapGetters({
      total: "cart/totalPrice",
    }),
  },
  validations: {
    order: {
      name: {required},
      email: {required, email},
      address: {required},
    }
  },
  methods: {
    ...mapActions({
      storeOrder: "orders/storeOrderAction",
      clearCartData: "cart/clearCartData",
    }),
    async submitOrder() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				
				const order = new FormData();

				order.append("name", this.order.name);
				order.append("email", this.order.email);
				order.append("address", this.order.address);
				order.append("cart", JSON.stringify(this.cart));
				order.append("total", this.total);
	
				await this.storeOrder(order);
	
				this.clearCartData();
				this.$router.push("/thanks");
			}
    },
  },
};
</script>