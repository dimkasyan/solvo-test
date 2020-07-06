<template>
  <div class="attemption">
    <div v-if="authorization_attempt.length === 0">
      <h1>Журнал пуст</h1>
    </div>
    <div v-else>
      <div class="table">
        <div class="table-header">
          <div>Попытка авторизации</div>
          <div>Результат</div>
        </div>
        <div class="table-results">
          <transition-group
            name="fade"
            :css="false"
            @before-appear="customBeforeAppearHook"
            @appear="customAppearHook">
                <div
                class="table-item"
                v-for="(login, index) in authorization_attempt"
                :key="index"
                :data-index="index">
                    <div class="table-item__time">{{ login.time_attempt }}</div>
                    <div class="table-item__result">{{ login.result_attempt }}</div>
                </div>
          </transition-group>
        </div>
      </div>
      <b-button @click="clearLoginItems" variant="primary"
        >Очистить журнал</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Velocity from "velocity-animate";

export default {
  computed: {
    ...mapState("auth", ["authorization_attempt"]),
  },
  methods: {
    ...mapMutations("auth", ["clearLoginItems"]),
    customBeforeAppearHook(el) {
      el.style.opacity = 0;
    },
    customAppearHook(el, done) {
      let delay = el.dataset.index * 250;
      setTimeout(function() {
        Velocity(el, { opacity: 1 }, { complete: done });
      }, delay);
    }
  }
};
</script>
