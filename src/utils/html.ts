export function stripClassNames(node: HTMLElement) {
  const newNode = node.cloneNode(true);
  (<Element>newNode).querySelectorAll("*").forEach((el) => {
    el.removeAttribute("class");
  });
  (<Element>newNode).removeAttribute("class");
  return newNode;
}
