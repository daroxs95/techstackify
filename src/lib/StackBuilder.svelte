<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { getTechIcons } from "./modules/TechIcons/api";
  import type { Icon } from "./modules/TechIcons/types";
  import { selectedStack } from "../store/techStach";
  import StackItem from "./StackItem.svelte";

  export let filterManually: boolean = false;

  let techs: Icon[] = [];
  let myStack: Icon[] = [];
  let query: string = "";
  let filteredTechs: Icon[] = [];

  $: {
    if (!filterManually)
      filteredTechs = techs.filter((t) => t.name.includes(query));
  }

  const filterTechs = (e) => {
    e.preventDefault();
    filteredTechs = techs.filter((t) => t.name.includes(query));
  };

  const unsubscribe = selectedStack.subscribe((value) => {
    myStack = value || [];
  });

  onMount(async () => {
    techs = await getTechIcons();
    filteredTechs = techs;
  });
  onDestroy(unsubscribe);
</script>

<div class="vstack">
  <form class="hstack f-wrap" on:submit={filterTechs} autocomplete="on">
    <input placeholder="Search" bind:value={query} />
    {#if filterManually}
      <button type="submit">Search</button>
    {/if}
  </form>

  <div class="hstack f-wrap">
    {#each filteredTechs as tech}
      <li>
        <StackItem
          {tech}
          isSelected={myStack.findIndex((i) => i.name === tech.name) !== -1}
          className="p-def f-ai-center f-jc-center"
          iconSize={70}
        />
      </li>
    {/each}
  </div>
</div>
