import { DEVICONS_BASE_URL } from "./constants";
import type { Icon } from "./types";

export async function getTechIcons() {
  const res = await fetch(
    `${DEVICONS_BASE_URL}/devicon.json`
  );
  return await res.json() as Icon[];
}