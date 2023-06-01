import { DEVICONS_BASE_URL } from "./constants";
import type { Icon } from "./types";

export function getSvgUrl(icon: Icon, version: string) {
  return `${DEVICONS_BASE_URL}/icons/${icon.name}/${icon.name}-${version}.svg`;
}
