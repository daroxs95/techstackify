<script>
  // import SvelteMarkdown from "svelte-markdown";
  import source from "../../content/help.md?raw";
  import UnorderedItem from "./Markdown/List/UnorderedItem.svelte";
  import Unordered from "./Markdown/List/Unordered.svelte";
</script>

<div class="vstack p-def">
<!--  <SvelteMarkdown-->
<!--    {source}-->
<!--    renderers={{ listitem: UnorderedItem, list: Unordered }}-->
<!--  />-->
    This is in maintenance mode. Please check back later.
</div>

<style>
  div {
    margin-bottom: var(--v-gap-l);
    gap: calc(2 * var(--v-gap));
  }
</style>
