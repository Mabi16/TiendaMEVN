<template>
  <div class="text-center">
    <h2>Paginas</h2>

    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Slug</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in pages" :key="i">
          <td class="align-middle">{{ p.name }}</td>
          <td class="align-middle">{{ p.slug }}</td>
          <td class="align-middle">
            <button class="btn btn-sm btn-warning mx-2" @click="handleEdit(p)">Editar</button>
            <button class="btn btn-sm btn-danger mx-2" @click="deletePage(p)">Borrar</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            <router-link class="btn btn-success mb-1 float-center" to="/admin/pages/agregar">Agregar Pagina</router-link>
          </td>
        </tr>
      </tfoot>
    </table>
    
    <div class="border">
      <div class="h5">Ejemplo de slug:</div>
      <div class="h6">
        " localhost:8080/esto-es-un-slug/este-es-otro-slug/ "
      </div>
    </div>
    
    <div class="float-end">
      
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["pages"]),
  },
  methods: {
    ...mapActions(["deletePage"]),
    handleEdit(page){
      this.$router.push(`/admin/pages/editar/${page._id}`);
    },
    
  },
};
</script>