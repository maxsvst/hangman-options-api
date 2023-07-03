<template>
  <div class="word">
    <span
      v-for="(letter, index) in dividedName"
      :key="letter + index"
      class="letter"
      >{{ correctLetters.includes(letter) ? letter : "" }}</span
    >
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    correctLetters: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  computed: {
    dividedName() {
      return this.$props.name?.split("");
    },
  },
});
</script>
