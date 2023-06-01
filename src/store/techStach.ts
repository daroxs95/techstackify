import { writable } from "svelte/store";
import type { Icon } from "../lib/modules/TechIcons/types";
import Logger from "../utils/logger";

export const selectedStack = writable<Icon[]>(getSavedStack());

export function addTechStackItem(data: Icon) {
  const newRequest = data;
  selectedStack.update(() => addTechItemToSavedStack(newRequest));
}

export function deleteTechStackItemByName(name: string) {
  selectedStack.update((items) => {
    const index = items.findIndex((i) => i.name === name);
    if (index !== -1) items.splice(index, 1);
    setSavedStack(items);
    return items;
  });
}

export function toggleTechStackItem(item: Icon) {
  selectedStack.update((prevItems) => {
    const items = prevItems || [];
    const index = items.findIndex((i) => i.name === item.name);
    if (index !== -1) items.splice(index, 1);
    else items.push(item);
    setSavedStack(items);
    return items;
  });
}

export function clearTechStack() {
  selectedStack.update(() => []);
  clearSavedStack();
}

// Local storage logic
function getSavedStack(): Icon[] {
  let list = [];
  try {
    list = JSON.parse(localStorage.getItem("myteckstack"));
  } catch (error) {
    Logger.Error(error);
  }
  return list;
}

export function setSavedStack(list: Icon[]) {
  localStorage.setItem("myteckstack", JSON.stringify(list));
}

export function addTechItemToSavedStack(item: Icon) {
  const list = getSavedStack() || [];
  const indexOfEquivalentItem = list.findIndex((i) => i.name === item.name);
  if (indexOfEquivalentItem === -1) {
    list.push(item);
  } else {
  }
  localStorage.setItem("myteckstack", JSON.stringify(list));
  return list;
}

export function clearSavedStack() {
  localStorage.removeItem("myteckstack");
}
