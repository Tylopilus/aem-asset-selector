export interface IAEMPostMessage {
  data: Data[];
  config: Config;
}

export interface Config {
  action: string;
}

export interface Data {
  path: string;
  url: string;
  type: string;
  title: string;
  size: string;
  img: string;
}
