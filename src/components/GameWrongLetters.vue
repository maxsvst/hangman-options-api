<template>
  <div v-show="wrongLetters.length" class="wrong-letters-container">
    <div class="wrong-letters">
      <p>Ошибки</p>
      <span
        v-for="(wrongLetter, index) in wrongLetters"
        :key="wrongLetter + index"
        >{{
          index + 1 === wrongLetters.length ? wrongLetter : wrongLetter + ", "
        }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  props: {
    wrongLetters: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
});
</script>
