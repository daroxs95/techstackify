import { DEVICONS_BASE_URL } from "./constants";
import type { Icon } from "./types";

export async function getTechIcons() {
  const res = await fetch(`${DEVICONS_BASE_URL}/devicon.json`);
  const list = (await res.json()) as Icon[];
  const versions = {};
  list.forEach((icon) => {
    icon.versions.svg.forEach((v) => {
      versions[v] = true;
    });
  });

  return { list, versions: Object.keys(versions) };
}
