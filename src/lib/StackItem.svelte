<script lang="ts">
  import type { SelectedIcon } from "./modules/TechIcons/types";
  import { toggleTechStackItem } from "../store/techStach";
  import { getSvgUrl } from "./modules/TechIcons/utils";
  import { getStyleString } from "../utils/styles";

  export let iconSize: number = 60;
  export let className: string = "";
  export let tech: SelectedIcon;
  export let isSelected: boolean = false;

  // The styles needs to be inline to have them on copied html
  $: styles = {
    "border-color": !isSelected && "transparent",
  };
  const imgStyles = {
    "aspect-ratio": "1",
  };
</script>

<div
  on:click={() => toggleTechStackItem(tech)}
  class={`border-1 border-r-1 ${className}`}
  style={getStyleString(styles)}
>
  <img
    title={tech.name}
    src={getSvgUrl(tech)}
    alt={tech.name}
    width={iconSize}
    height={iconSize}
    style={getStyleString(imgStyles)}
  />
</div>
