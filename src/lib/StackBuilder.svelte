<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { getTechIcons } from "./modules/TechIcons/api";
  import type { Icon } from "./modules/TechIcons/types";
  import { selectedStack } from "../store/techStach";
  import StackItem from "./StackItem.svelte";
  import { humanizeText } from "../utils/text";
  import { selectedIconFromMinimal } from "./modules/TechIcons/utils";
  import { hexToCSSFilter } from "hex-to-css-filter";

  export let filterManually: boolean = false;

  let techs: Icon[] = [];
  let filteredTechs: Icon[] = [];
  let versions: string[] = [];

  let myStack: Icon[] = [];
  let query: string = "";
  let selectedVersion: string = "";
  let useColorFilter: boolean = false;
  let colorFilter: string = "";
  let preCalcColorFilter: string = "";

  const filterTechs = (query: string, techsArr: Icon[]) => {
    return techsArr.filter(
      (t) =>
        (t.name.includes(query) || t.tags.includes(query)) &&
        (!selectedVersion || t.versions.svg.includes(selectedVersion))
    );
  };

  const sortTechs = (techsArr: Icon[]) => {
    return techsArr.sort((x, y) => x.name.localeCompare(y.name));
  };

  $: {
    if (!filterManually) filteredTechs = filterTechs(query, techs);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const stackQuery = urlParams.get("stack");

  const unsubscribe = selectedStack.subscribe((value) => {
    myStack = value || [];
  });

  $: {
    preCalcColorFilter = colorFilter ? hexToCSSFilter(colorFilter).filter : "";
  }

  onMount(async () => {
    const { list, versions: versionsFromApi } = await getTechIcons();
    versions = versionsFromApi;
    // selectedVersion = versions[0];
    filteredTechs = techs = list;

    if (stackQuery) {
      selectedStack.update(() =>
        JSON.parse(stackQuery).map((i) => selectedIconFromMinimal(i, techs))
      );
    }
  });
  onDestroy(unsubscribe);
</script>

<div class="vstack">
  <form
    class="hstack f-wrap"
    on:submit={(e) => {
      e.preventDefault();
      filteredTechs = filterTechs(query, techs);
    }}
    autocomplete="on"
  >
    <input placeholder="Search" bind:value={query} />
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
    <fieldset class="hstack f-ai-center m-0 f-wrap">
      <label for="use-color-filter">Use color filter:</label>
      <input
        id="use-color-filter"
        bind:checked={useColorFilter}
        placeholder="Icon size"
        type="checkbox"
        class="w-min-content"
      />
    </fieldset>
    {#if useColorFilter}
      <fieldset class="hstack f-ai-center m-0 f-wrap">
        <input
          id="colorFilter"
          class="medium-input"
          bind:value={colorFilter}
          placeholder={colorFilter || "Custom"}
        />
        <input
          id="colorFilter"
          type="color"
          bind:value={colorFilter}
          placeholder={colorFilter}
        />
      </fieldset>
    {/if}
  </form>

  <div class="hstack f-wrap f-ai-center f-jc-center">
    {#each sortTechs(filteredTechs) as tech (`${tech.name}${selectedVersion}`)}
      <li>
        <StackItem
          tech={{
            ...tech,
            selectedVersion: tech.versions.svg.includes(selectedVersion)
              ? selectedVersion
              : tech.versions.svg[0],
            applyColorFilter: useColorFilter,
            customColor: colorFilter,
          }}
          className="p-def f-ai-center f-jc-center border-1 border-r-1 hoverable"
          styles={{
            "border-color":
              myStack.findIndex((i) => i.name === tech.name) === -1 &&
              "transparent",
          }}
          iconSize={80}
          overrideColorFilter={preCalcColorFilter}
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
