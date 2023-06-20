<script lang="ts">
  import type { SelectedIcon } from "./modules/TechIcons/types";
  import { toggleTechStackItem } from "../store/techStach";
  import { getSvgUrl } from "./modules/TechIcons/utils";
  import { getStyleString } from "../utils/styles";
  import { hexToCSSFilter } from "hex-to-css-filter";

  export let iconSize: number = 60;
  export let className: string = "";
  export let tech: SelectedIcon;
  export let styles: Record<string, string> = {};
  // This is to avoid wasting cpu computing the same value over and over, mainly to override this in StackBuilder component
  export let overrideColorFilter: string = "";

  $: cssFilter = (() => {
    if (!tech.applyColorFilter) return "none";
    if (overrideColorFilter)
      return `brightness(0) saturate(100%) ${overrideColorFilter}`;
    // if (tech.selectedVersion.includes("plain"))
    if (!tech.customColor && !tech.color) return "none";
    return `brightness(0) saturate(100%) ${
      hexToCSSFilter(tech.customColor || tech.color).filter
    }`;
  })();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={() => toggleTechStackItem(tech)}
  class={`${className}`}
  style={getStyleString(styles)}
>
  <img
    title={tech.name}
    src={getSvgUrl(tech)}
    alt={tech.name}
    width={iconSize}
    height={iconSize}
    style={getStyleString({
      "aspect-ratio": "1",
      filter: cssFilter,
    })}
  />
</div>
