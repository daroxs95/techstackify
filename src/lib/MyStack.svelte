<script lang="ts">
  import type { SelectedIcon } from "./modules/TechIcons/types";
  import {
    clearTechStack,
    selectedStack,
    setSavedStack,
  } from "../store/techStach";
  import { onDestroy } from "svelte";
  import { getStyleString } from "../utils/styles";
  import StackItem from "./StackItem.svelte";
  import shareHandler from "../utils/share";
  import {
    selectedIcon2Minimal,
    selectedIconFromMinimal,
  } from "./modules/TechIcons/utils";
  import Help from "./modules/Help.svelte";
  import { stripClassNames } from "../utils/html";
  import RandomizeButton from "./modules/RandomizeButton.svelte";

  export let gap: string = "10px";

  let bgColor: string = "transparent";
  let iconsSize: number = 80;
  let useColorFilter: boolean = false;
  let myStack: SelectedIcon[] = [];

  // The styles needs to be inline to have them on copied html
  $: styles = {
    "background-color": bgColor,
    overflow: "auto",
    height: "200px",
    padding: "10px",
    display: "flex",
    "flex-wrap": "wrap",
    "align-items": "center",
    "justify-content": "center",
  };

  const copyHtml = () => {
    var node = document.getElementById("techstackify");
    navigator.clipboard
      .writeText((<Element>stripClassNames(node))?.outerHTML)
      .then(() => alert("Html copied to clipboard"))
      .catch(() => alert("Sorry, could'nt copy html to clipboard"));
  };

  const unsubscribe = selectedStack.subscribe((value) => {
    myStack = value || [];
  });
  onDestroy(unsubscribe);
</script>

<form
  class="hstack f-wrap"
  on:submit={(e) => {
    e.preventDefault();
  }}
>
  <fieldset class="hstack f-ai-center m-0 f-wrap">
    <label for="bgcolor">Bg color:</label>
    <input id="bgcolor" bind:value={bgColor} placeholder={bgColor} />
    <input
      id="bgcolor"
      type="color"
      bind:value={bgColor}
      placeholder={bgColor}
    />
  </fieldset>
  <fieldset class="hstack f-ai-center m-0 f-wrap">
    <label for="icon-size">Icon size:</label>
    <input
      id="icon-size"
      bind:value={iconsSize}
      placeholder="Icon size"
      type="number"
      class="w-min-content small-input"
    />
  </fieldset>
  <div class="hstack m-0 f-wrap f-grow">
    <button class="outline" on:click={() => clearTechStack()}
      >Clean stack</button
    >
    <!-- <button class="outline" on:click={renderBanner}>Get</button> -->
    <button class="outline" on:click={copyHtml}>Copy raw html</button>
    <div class="right-controls">
      <RandomizeButton />
      <button
        class="stealth material-symbols-outlined"
        on:click={() => {
          shareHandler(
            "Take a look at my techstack",
            `?stack=${JSON.stringify(myStack.map(selectedIcon2Minimal))}`
          );
        }}
      >
        share
      </button>
      <button
        class="stealth material-symbols-outlined"
        on:click={() => {
          // @ts-ignore
          window.helpDialog.showModal();
        }}
      >
        help
      </button>
      <button
        class=" stealth material-symbols-outlined"
        on:click={() => {
          setSavedStack(myStack);
        }}
      >
        save
      </button>
    </div>
  </div>
</form>

<dialog id="helpDialog" class="fade-in">
  <div class="right-controls w-min-content">
    <button
      class=" stealth material-symbols-outlined"
      on:click={() => {
        // @ts-ignore
        window.helpDialog.close();
      }}
    >
      close
    </button>
  </div>
  <Help />
</dialog>

<div
  id="techstackify"
  class="gen-stack border-1"
  style={getStyleString(styles)}
>
  <ul
    style={getStyleString({
      gap,
      margin: 0,
      display: "flex",
      "flex-wrap": "wrap",
      "align-items": "center",
      "justify-content": "center",
      "list-style": "none",
    })}
  >
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
    resize: vertical;
  }

  .small-input {
    width: 80px;
  }

  .right-controls {
    margin-left: auto;
  }
</style>
