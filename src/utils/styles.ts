export const getStyleString = (styles: object) =>
  Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value}`)
    .join("; ");
