<template>
    <div>
      <Header />
  <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
  methods: {
    ...mapActions(["setPagesAction", "setCategoriesAction"]),
    ...mapActions({ initializeCart: "cart/initializeCart" }),
  },
  //cambiar background color usando javascript
  /*beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#FFF8DD')
  },*/
  created() {
    this.setPagesAction();
    this.setCategoriesAction();
    this.initializeCart(this.$store);
  },
};
</script>

<style>
 html  {

    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden; 

}
.btn:focus{
  outline: none !important;
  box-shadow: none !important;
}
.rojo{
  color: red;
}
.col-pag{
  color:white;
  background-color: #eb4d55;

}
</style>