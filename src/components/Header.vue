<template>
  <nav
    class="
      navbar navbar-expand-md
      border-bottom border-light
      navbar-dark
      sticky-top
      text-white
      shadow
    "
      style="background-color:#eb4d55;"
  >
  <!--#66635f-->
  <!--#a1794f-->
    <!-- <router-link class="navbar-brand h5 p-3 ms-4" to="/">TiendaBD</router-link> -->
    <a class="navbar-brand h5 p-3 ms-4" href="/">TiendaBD</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-for="(p, i) in pages" :key="i">

            
          <router-link
            class="nav-link text-white h6 m-3 rounded hover"
            active-class="active"
            v-if="p.slug != 'inicio'"
            :to="'/' + p.slug"
          >
          
            {{ p.name }}
          </router-link>

        </li>
        <li class="nav-item active">
          <router-link
            class="nav-link text-white h6 m-3 rounded hover"         
            active-class="active"
            to="/admin"
          > Administrar
          </router-link>
        </li>
      </ul>
    </div>
    <CartSummary />
  </nav>
</template>

<script>
import { mapState } from "vuex";
import CartSummary from "./CartSummary";
export default {
  components: {CartSummary},
  computed: {
    ...mapState(["pages"]),
  },
};
</script>

<style>
.hover:hover,a.active{
  background-color: white!important;
  color:#eb4d55!important;
}

</style>