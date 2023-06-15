export interface Icon {
  name: string;
  tags: string[];
  versions: Versions;
  color: string;
  aliases: any[];
}

export interface Versions {
  svg: string[];
  font: string[];
}

export interface SelectedIcon {
  name: string;
  tags: string[];
  versions: Versions;
  color: string;
  aliases: any[];
  selectedVersion: string;
}
