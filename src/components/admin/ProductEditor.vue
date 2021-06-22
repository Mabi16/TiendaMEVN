<template>
  <div class="">
    <h2 class="text-center p-2">
      {{ editMode ? "Editar Producto " : " Agregar Producto " }}
    </h2>

    <div class="form-group">
      <label for="">Nombre <i class="rojo"> *</i></label>
      <input type="text" class="form-control" v-model="product.name" />
    </div>

    <div class="form-group">
      <label for="">Descripcion<i class="rojo"> *</i></label>
      <textarea class="form-control" v-model="product.description"></textarea>
    </div>

    <div class="form-group">
      <label for="">Precio<i class="rojo"> *</i></label>
      <input type="text" class="form-control" v-model="product.price" />
    </div>

    <div class="form-group">

      <label for="">Imagen</label>
      <div class="row mb-2">
        <label for="inp" class="form-control col" v-text="value" style="width: 50%; margin-left: 13px"></label>
        <input type="file" id="inp" class="col" accept=".png, .jpg, .jpeg" @change="onFileSelected" style="visibility: hidden" />
      </div>

      <p v-if="editMode" class="mt-3">
        Imagen actual:
        <img :src="productImages + product.image" width="100" />
      </p>

    </div>

    <div class="form-group">
      <label for="">Categoria<i class="rojo"> *</i></label>
      <select class="form-control" @change="onChange">
        <option :value="null">Selecciona una categoria</option>
        <option v-for="(c, i) in categories" :key="i" :value="c.slug" :selected="c.slug == product.category">
          {{ c.name }}
        </option>
      </select>
    </div>

    <h4 v-if="$v.$invalid && $v.$dirty" class="bg-danger rounded text-white text-center m-2 p-2"
      style="position: relative; left: 25%; right: 25%; max-width: 50%">
      Los campos con <b>*</b> requieren un valor!
    </h4>

    <div class="text-center m-1">

      <router-link class="btn btn-secondary m-1" to="/admin/products">Atras</router-link>
      <button class="btn btn-primary m-1" disabled @click="handleProduct" v-if="$v.$invalid && $v.$dirty">
        {{ editMode ? "Editar" : "Agregar" }}
      </button>
      <button class="btn btn-primary m-1" @click="handleProduct" v-else>
        {{ editMode ? "Editar" : "Agregar" }}
      </button>

    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        image: null,
        category: null,
      },
      value: "Selecciona una img",
    };
  },
  computed: {
    ...mapState(["categories", "productImages"]),

    editMode() {
      return this.$route.params["op"] == "editar";
    },
  },
  validations: {
    product: {
      name: { required },
      description: { required },
      price: { required },
      category: { required },
    },
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["addProduct", "editProduct"]),

    onFileSelected(e) {
      //VALIDACION DE IMAGEN .jpg, .jpeg, .png
      if (
        e.target.files[0]["type"] === "image/jpeg" ||
        e.target.files[0]["type"] === "image/png" ||
        e.target.files[0]["type"] === "image/jpg"
      ) {
        this.product.image = e.target.files[0];
        this.value = this.product.image.name;
      } else {
        alert("Selecciona una imagen valida (.png, .jpg, .jpeg).");
        this.value = "Selecciona una imagen valida";
      }
    },
    onChange(e) {
      this.product.category = e.target.value;
    },

    async handleProduct() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const product = new FormData();

        product.append("name", this.product.name);
        product.append("description", this.product.description);
        product.append("price", this.product.price);
        product.append("imageUpload", this.product.image);
        product.append(
          "category",
          this.product.category.slug || this.product.category
        );

        if (this.editMode) {
          product.append("id", this.product._id);
          product.append("image", this.product.image.name);

          await this.editProduct(product);
        } else {
          await this.addProduct(product);
        }

        this.setCurrentPage(1);
        this.$router.push("/admin/products");
      }
    },
  },
  created() {
    if (this.editMode) {
      Object.assign(
        this.product,
        this.$store.getters.productById(this.$route.params["id"])
      );
    }
  },
};
</script>
