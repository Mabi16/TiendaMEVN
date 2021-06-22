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
.btn:focus{
  outline: none !important;
  box-shadow: none !important;
}
.rojo{
  color: red;
}
</style>