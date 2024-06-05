<template>
  <h1>Demo</h1>
  <p class="greeting">{{ greeting }}</p>
  <p>{{ result }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Test",
  setup() {
    const greeting = ref("Hello!");
    const result = f(10000);
    return {
      greeting,
      result,
    };
  },
});

const f = (n: number): number => {
  if (n === 1) return 1;
  else return f(n - 1) + n;
};
</script>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
