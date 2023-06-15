export function humanizeText(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace("-", " ")
    .replace(/^./, (str) => str.toUpperCase());
}