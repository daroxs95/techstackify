<script lang="ts">
  import type { Icon } from "./modules/TechIcons/types";
  import { clearTechStack, selectedStack } from "../store/techStach";
  import { onDestroy } from "svelte";
  import { getStyleString } from "../utils/styles";
  import StackItem from "./StackItem.svelte";

  export let iconsSize: number = 80;
  export let gap: string = "";

  let bgColor: string = "white";
  let myStack: Icon[] = [];

  $: styles = {
    "background-color": bgColor,
    gap,
  };

  const unsubscribe = selectedStack.subscribe((value) => {
    myStack = value || [];
  });
  onDestroy(unsubscribe);
</script>

<fieldset class="hstack">
  <div class="hstack f-ai-center m-0">
    <label for="bgcolor">Bg color:</label>
    <input id="bgcolor" bind:value={bgColor} placeholder={bgColor} />
    <input
      id="bgcolor"
      type="color"
      bind:value={bgColor}
      placeholder={bgColor}
    />
  </div>
  <button class="outline" on:click={clearTechStack}>Clean stack</button>
</fieldset>

<div
  class="gen-stack hstack f-wrap border-1 f-ai-center f-jc-center"
  style={getStyleString(styles)}
>
  <ul class="hstack f-wrap f-ai-center f-jc-center">
    {#each myStack as tech}
      <li>
        <StackItem {tech} iconSize={iconsSize} />
      </li>
    {/each}
  </ul>
</div>

<style>
  .gen-stack {
    resize: vertical;
    overflow: auto;
    min-height: 200px;
    padding: 10px;
    border-color: var(--app-bg-dark);
  }
</style>
