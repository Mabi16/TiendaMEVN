<template>
<div class="shadow rounded border-b" style="background-color:#fffdf5;">
  <p class="h3 mt-3 pt-3 ms-5">Administracion</p> 
  <div class="row p-3">
    <div class="col-3 p-2 border">
      <router-link class="col-12 mb-3 btn btn-bd-light btn-hover border border-2" to="/admin/products" exact-active-class="exact-active">
        Productos</router-link
      >
      <router-link class="col-12 mb-3 btn btn-bd-light btn-hover border border-2" to="/admin/orders" exact-active-class="exact-active">
        Pedidos</router-link
      >
      <router-link class="col-12 mb-3 btn btn-bd-light btn-hover border border-2" to="/admin/pages" exact-active-class="exact-active">
        Paginas</router-link
      >
    </div>
    <div class="col">
      
    <router-view />
    </div>
  </div>
</div>
</template>

<style>
.btn-hover:hover,.exact-active{
  color:#eb4d55!important;
  border-color:#eb4d55!important;
}
</style>