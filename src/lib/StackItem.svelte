<script lang="ts">
  import type { SelectedIcon } from "./modules/TechIcons/types";
  import { toggleTechStackItem } from "../store/techStach";
  import { getSvgUrl } from "./modules/TechIcons/utils";
  import { getStyleString } from "../utils/styles";

  export let iconSize: number = 60;
  export let className: string = "";
  export let tech: SelectedIcon;
  export let styles: Record<string, string> = {};
</script>

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
    })}
  />
</div>
