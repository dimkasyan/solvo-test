<template>
  <div class="row justify-content-center flex-column align-items-center">
    <div class="alert alert-info">
      Логин: test<br>
      Пароль: test
    </div>
    <b-form class="col-lg-4 col-md-6 col-sm-8 col-12">
      <b-form-group
        id="input-group-1"
        label="Введите логин"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="username"
          required
          placeholder="Введите логин"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="password"
          required
          placeholder="Введите пароль"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-overlay
          :show="status.loggingIn"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
          @hidden="onHidden">
            <b-button
                @click="handleSubmit"
                ref="button"
                variant="primary"
                :disabled="isSubmitDisabled">
                Войти
                </b-button>
        </b-overlay>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      timeout: null,
    };
  },
  computed: {
    isSubmitDisabled() {
      return !this.password || !this.username;
    },
    ...mapState("auth", ["status"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    setTimeout(callback) {
      this.clearTimeout();
      this.timeout = setTimeout(() => {
        this.clearTimeout();
        callback();
      }, 5000);
    },
    onHidden() {
      this.$refs.button.focus();
    },
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    },
  },
};
</script>
