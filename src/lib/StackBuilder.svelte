<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { getTechIcons } from "./modules/TechIcons/api";
  import type { Icon } from "./modules/TechIcons/types";
  import { selectedStack } from "../store/techStach";
  import StackItem from "./StackItem.svelte";
  import { humanizeText } from "../utils/text";

  export let filterManually: boolean = false;

  let techs: Icon[] = [];
  let filteredTechs: Icon[] = [];
  let versions: string[] = [];

  let myStack: Icon[] = [];
  let query: string = "";
  let selectedVersion: string = "";

  $: {
    if (!filterManually)
      filteredTechs = techs.filter(
        (t) =>
          (t.name.includes(query) || t.tags.includes(query)) &&
          (!selectedVersion || t.versions.svg.includes(selectedVersion))
      );
  }

  const filterTechs = (e) => {
    e.preventDefault();
    filteredTechs = techs.filter(
      (t) =>
        (t.name.includes(query) || t.tags.includes(query)) &&
        (!selectedVersion || t.versions.svg.includes(selectedVersion))
    );
  };

  const unsubscribe = selectedStack.subscribe((value) => {
    myStack = value || [];
  });

  onMount(async () => {
    const { list, versions: versionsFromApi } = await getTechIcons();
    versions = versionsFromApi;
    // selectedVersion = versions[0];
    filteredTechs = techs = list;
  });
  onDestroy(unsubscribe);
</script>

<div class="vstack">
  <form class="hstack f-wrap" on:submit={filterTechs} autocomplete="on">
    <input placeholder="Search" bind:value={query} />
    <fieldset class="hstack f-ai-center m-0 f-wrap">
      <label>Sort by:</label>
      <select bind:value={selectedVersion}>
        <option id="no-option" value="">Name</option>
        {#each versions as option}
          <option id={option} value={option}>{humanizeText(option)}</option>
        {/each}
      </select>
    </fieldset>
    {#if filterManually}
      <button type="submit">Search</button>
    {/if}
    <fieldset class="hstack f-ai-center m-0 f-wrap">
      <label>Icon style:</label>
      <select bind:value={selectedVersion}>
        <option id="no-option" value="">No preference</option>
        {#each versions as option}
          <option id={option} value={option}>{humanizeText(option)}</option>
        {/each}
      </select>
    </fieldset>
  </form>

  <div class="hstack f-wrap f-ai-center f-jc-center">
    {#each filteredTechs as tech (`${tech.name}${selectedVersion}`)}
      <li>
        <StackItem
          tech={{
            ...tech,
            selectedVersion: tech.versions.svg.includes(selectedVersion)
              ? selectedVersion
              : tech.versions.svg[0],
          }}
          className="p-def f-ai-center f-jc-center border-1 border-r-1 hoverable"
          styles={{
            "border-color":
              myStack.findIndex((i) => i.name === tech.name) === -1 &&
              "transparent",
          }}
          iconSize={80}
        />
      </li>
    {/each}
  </div>
</div>

<style>
  :global(.hoverable) {
    transition: border-color 0.3s;
  }
  :global(.hoverable:hover) {
    border-color: var(--color-primary-light) !important;
  }
</style>
