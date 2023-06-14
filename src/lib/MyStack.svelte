<script lang="ts">
  import type { Icon } from "./modules/TechIcons/types";
  import { clearTechStack, selectedStack } from "../store/techStach";
  import { onDestroy } from "svelte";
  import { getStyleString } from "../utils/styles";
  import StackItem from "./StackItem.svelte";

  export let iconsSize: number = 80;
  export let gap: string = "10px";

  let bgColor: string = "transparent";
  let myStack: Icon[] = [];

  // The styles needs to be inline to have them on copied html
  $: styles = {
    "background-color": bgColor,
    resize: "vertical",
    overflow: "auto",
    "min-height": "200px",
    padding: "10px",
    display: "flex",
    "flex-wrap": "wrap",
    "align-items": "center",
    "justify-content": "center",
  };
  const ulStyles = {
    gap,
    margin: 0,
    display: "flex",
    "flex-wrap": "wrap",
    "align-items": "center",
    "justify-content": "center",
    "list-style": "none",
  };

  const renderBanner = () => {};

  const copyHtml = () => {
    var node = document.getElementById("techstackify");
    navigator.clipboard
      .writeText(node?.outerHTML)
      .then(() => alert("Html copied to clipboard"))
      .catch(() => alert("Sorry, could'nt copy html to clipboard"));
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
  <!-- <button class="outline" on:click={renderBanner}>Get</button> -->
  <button class="outline" on:click={copyHtml}>Copy raw html</button>
</fieldset>

<div
  id="techstackify"
  class="gen-stack border-1"
  style={getStyleString(styles)}
>
  <ul style={getStyleString(ulStyles)}>
    {#each myStack as tech}
      <li>
        <StackItem {tech} iconSize={iconsSize} />
      </li>
    {/each}
  </ul>
</div>

<style>
  .gen-stack {
    border-color: var(--app-bg-dark);
    margin-bottom: var(--h-gap);
  }
</style>
