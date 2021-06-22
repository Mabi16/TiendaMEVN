<template>
  <div class="">
    <h2 class="text-center p-2">
      {{ editMode ? "Editar Pagina " : " Agregar Pagina " }}
    </h2>

    <div class="form-group">
      <label for="">Nombre</label>
      <input type="text" class="form-control" v-model="page.name" />
    </div>

    <div class="form-group">
      <label for="">Slug</label>
      <input type="text" class="form-control" v-model="page.slug" />
    </div>

    <div class="form-group">
      <label for="">Contenido</label>
      <!-- <textarea class="form-control" v-model="page.content"></textarea> -->
      <vue-editor v-model="page.content" />
    </div>

    <h4
      v-if="$v.$invalid && $v.$dirty"
      class="bg-danger rounded text-white text-center m-2 p-2" style="position:relative; left:25%; right:25%; max-width:50%;"
    >
      Todos los campos requieren un valor!
    </h4>

    <div class="text-center">
      
      <router-link class="btn btn-secondary m-1" to="/admin/pages">Atras</router-link>
      
      <button class="btn btn-primary m-1" disabled @click="handlePage" v-if="$v.$invalid && $v.$dirty">
        {{ editMode ? "Editar" : "Agregar" }}
      </button>
      <button class="btn btn-primary m-1" @click="handlePage" v-else>
        {{ editMode ? "Editar" : "Agregar" }}
      </button>

    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      page: {
        name: null,
        slug: null,
        content: null,
      },
    };
  },
  computed: {
    editMode() {
      return this.$route.params["op"] == "editar";
    },
  },
  validations: {
    page: {
      name: { required },
      slug: { required },
      content: { required },
    },
  },
  methods: {
    ...mapActions(["addPage", "editPage"]),

    async handlePage() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        if (this.editMode) {
          await this.editPage(this.page);
        } else {
          await this.addPage(this.page);
        }

        this.$router.push("/admin/pages");
      }
    },
  },
  created() {
    if (this.editMode) {
      Object.assign(
        this.page,
        this.$store.getters.pageById(this.$route.params["id"])
      );
    }
  },
};
</script>