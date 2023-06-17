import { DEVICONS_BASE_URL } from "./constants";
import type { Icon, SelectedIcon, SelectedIconMinimal } from "./types";

export function getSvgUrl(icon: SelectedIcon) {
  return `${DEVICONS_BASE_URL}/icons/${icon.name}/${icon.name}-${icon.selectedVersion}.svg`;
}

export function selectedIcon2Minimal(icon: SelectedIcon): SelectedIconMinimal {
  return {
    name: icon.name,
    selectedVersion: icon.selectedVersion,
  };
}

export function selectedIconFromMinimal(
  icon: SelectedIconMinimal,
  list: Icon[]
): SelectedIcon {
  return {
    ...list.find((i) => i.name === icon.name),
    selectedVersion: icon.selectedVersion,
  };
}
