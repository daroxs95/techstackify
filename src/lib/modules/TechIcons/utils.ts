import { DEVICONS_BASE_URL } from "./constants";
import type { SelectedIcon } from "./types";

export function getSvgUrl(icon: SelectedIcon) {
  return `${DEVICONS_BASE_URL}/icons/${icon.name}/${icon.name}-${icon.selectedVersion}.svg`;
}
