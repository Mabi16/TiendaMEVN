<template>
  <div class="mt-5">

    <div class="form-group">
      <label for="">Usuario</label>
      <input type="text" class="form-control" v-model="username" />
    </div>

    <div class="form-group">
      <label for="">Contraseña</label>
      <input type="password" class="form-control" v-model="password" />
    </div>

    <h4
      v-if="showFailureMessage"
      class="rojo rounded text-center m-2" style="position:relative; left:25%; right:25%; max-width:50%;"
    >
      Datos incorrectos, intenta de nuevo.
    </h4>

    <div class="text-center">
      <button class="btn btn-primary m-3" @click="handleAuth">
        Ingresar
      </button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      username: "admin",
      password: "pass",
      showFailureMessage: false
    };
  },
  computed: {
    ...mapState({ authenticated: state => state.auth.authenticated})
  },
  methods: {
    ...mapActions({ authenticate: "auth/authenticate"}),

    async handleAuth() {
      await this.authenticate({
        username: this.username,
        password: this.password
      });

      if (this.authenticated) {
        this.$router.push("/admin")
      }
      else {
        this.showFailureMessage = true;
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