<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure :wrong-letters-length="wrongLetters.length" />
    <GameWrongLetters :wrong-letters="wrongLetters" />
    <GameWord :name="name" :correct-letters="correctLetters" />
  </div>
  <GamePopup ref="popup" @restart-game="restartGame" :name="name" />
  <GameNotification ref="notification" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameHeader from "./components/GameHeader.vue";
import GameFigure from "./components/GameFigure.vue";
import GameWrongLetters from "./components/GameWrongLetters.vue";
import GameWord from "./components/GameWord.vue";
import GamePopup from "./components/GamePopup.vue";
import GameNotification from "./components/GameNotification.vue";
import { getRandomWord } from "./api/getRandomWord";

interface State {
  name: string;
  letters: string[];
}

export default defineComponent({
  components: {
    GameHeader,
    GameFigure,
    GameWrongLetters,
    GameWord,
    GamePopup,
    GameNotification,
  },
  data(): State {
    return {
      name: "",
      letters: [],
    };
  },
  methods: {
    printKey(e: KeyboardEvent) {
      if (this.isWin || this.isLose) {
        return;
      }

      if (this.letters.includes(e.key)) {
        (this.$refs["notification"] as any)?.openNotification();
        setTimeout(() => {
          (this.$refs["notification"] as any)?.closeNotification();
        }, 2000);
        return;
      }

      if (/[а-яА-ЯёЁ]/.test(e.key)) {
        this.letters.push(e.key).toString().toLowerCase();
      }
    },
    async restartGame() {
      (this.$refs["popup"] as any)?.closePopup("win");
      this.letters = [];
      await this.getRandomName();
    },
    async getRandomName() {
      try {
        const name = await getRandomWord();
        this.name = name.toLowerCase();
      } catch (err) {
        console.log(err);
        this.name = "";
      }
    },
  },
  computed: {
    correctLetters(): string[] {
      return this.letters.filter((letter: string) =>
        this.name.includes(letter)
      );
    },
    wrongLetters(): string[] {
      return this.letters.filter(
        (letter: string) => !this.name.includes(letter)
      );
    },
    isWin(): boolean {
      return this.name
        .split("")
        .every((letter: string) => this.correctLetters.includes(letter));
    },
    isLose(): boolean {
      return this.wrongLetters.length === 6;
    },
  },
  watch: {
    wrongLetters() {
      if (this.isLose) {
        (this.$refs["popup"] as any)?.openPopup("lose");
      }
    },
    correctLetters() {
      if (this.isWin) {
        (this.$refs["popup"] as any)?.openPopup("win");
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.printKey);
  },
  unmounted() {
    window.removeEventListener("keydown", this.printKey);
  },
});
</script>
