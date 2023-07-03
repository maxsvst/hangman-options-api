<template>
  <div v-show="isPopupVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>Загаданное имя: {{ name }}</h3>
      </template>
      <button @click="$emit('restartGame')">Сыграть еще раз</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gameStatus } from "../type/gameStatus";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isPopupVisible: Boolean(false),
      gameStatus: "",
    };
  },
  methods: {
    openPopup(status: gameStatus) {
      this.gameStatus = status;
      this.isPopupVisible = true;
    },
    closePopup(status: gameStatus) {
      this.gameStatus = status;
      this.isPopupVisible = false;
    },
  },
  expose: ["openPopup", "closePopup"],
  emits: ["restartGame"],
});
</script>
