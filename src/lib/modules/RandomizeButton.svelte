<script lang="ts">
  import type { SelectedIcon } from "../modules/TechIcons/types";
  import {
    clearTechStack,
    selectedStack,
    setSavedStack,
  } from "../../store/techStach";
  import { onDestroy } from "svelte";
  import { shuffleArray } from "../../utils/array";

  let myStack: SelectedIcon[] = [];

  const unsubscribe = selectedStack.subscribe((value) => {
    myStack = value || [];
  });
  onDestroy(unsubscribe);
</script>

<button
  title="Shuffle your stack"
  class="stealth material-symbols-outlined"
  on:click={() => {
    selectedStack.update(() => shuffleArray(myStack));
  }}
>
  casino
</button>
