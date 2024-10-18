export type Type = 'folder' | 'file';

export type Component = {
  name: string;
  type: Type;
  components?: Component[];
  pattern?: string;
  layer?: string;
};

export type Layer = {
  name: string;
  canBeAccessedBy?: string[];
  required?: boolean;
};

export type Config = {
  version: string;
  exclude: string[];
  layers: Layer[];
  structure: Component[];
};
