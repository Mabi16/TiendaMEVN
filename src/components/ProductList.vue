<template>
  <div class="row mt-3">
    <CategoryList />
    <div class="col-md-10 px-5">
      <div class="row d-flex justify-content-between">
        <div class="card col-3 mt-3 me-2 card border border-dark" v-for="(p,i) in products" :key="i" style="width:30%; height:auto;">
          
            <img :src="productImages + p.image" class="img-fluid border-dark border-bottom card-img-top" >
            <div class="card-body">
          <h3 class="card-title">
            {{p.name}}
          </h3>
          <p>
            {{p.description}}
          </p>
          <p>
             Precio: <b>{{p.price | currency}}</b>
          </p>
          
          

            </div>
            <div class="d-flex justify-content-center card-footer" style="margin-left:-4%; margin-right:-4%">
            <button class="btn btn-primary" @click="handleAddProduct(p)">Agregar al carro</button>

            </div>
        </div>
      </div>
      <ProductPagination />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CategoryList from "./CategoryList";
import ProductPagination from "./ProductPagination";

export default {
  components: { CategoryList ,ProductPagination},
  computed: {
    ...mapState(["products","productImages"]),
  },
  methods:{
    ...mapActions(["setProductsByCategoryAction"]),
    ...mapMutations(["setCurrentCategory","setCurrentPage"]),
    ...mapMutations({
      addProduct: "cart/addProduct",
    }),
    handleAddProduct(product) {
      this.addProduct(product);
    }
  },
  created(){
    this.setCurrentPage(1);
    const category = this.$route.params.category;
    this.setProductsByCategoryAction(category);
    this.setCurrentCategory(category);
  },
  beforeRouteUpdate (to,from,next){
    this.setCurrentPage(1);
    const category = to.params.category;
    this.setProductsByCategoryAction(category);
    this.setCurrentCategory(category);
    next();
  }
};
</script>