<template>
  <div class="app" id="app">
    <div id="nav">
      <b-card title="Card Title" no-body>
        <b-card-header header-tag="nav">
          <b-nav align="center" card-header pills>
            <b-nav-item to="/" exact exact-active-class="active">
              Главная страница
            </b-nav-item>
            <b-nav-item to="/sessionlog" exact exact-active-class="active">
              Страница журнала
            </b-nav-item>
          </b-nav>
        </b-card-header>
        <b-card-body>
          <div v-if="alert.message" :class="`alert ${alert.type} mx-auto w-25`">
            {{ alert.message }}
          </div>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState(["alert"]),
  },
  methods: {
    ...mapActions("alert", ["clear"]),
  },
  watch: {
    $route(to, from) {
      this.clear();
    },
  },
};
</script>
