<template>
  <div class="notification-container" :class="{ show: isNotoficationVisible }">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface State {
  isNotoficationVisible: boolean;
}

export default defineComponent({
  data(): State {
    return {
      isNotoficationVisible: false,
    };
  },
  methods: {
    openNotification() {
      this.isNotoficationVisible = true;
    },
    closeNotification() {
      this.isNotoficationVisible = false;
    },
  },
  expose: ["openNotification", "closeNotification"],
});
</script>
