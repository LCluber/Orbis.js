export type ValidExtensions = {
  file: string[];
  img: string[];
  sound: string[];
  [key: string]: string[];
};

export type Default = {
  maxPending: number;
  tick: number;
};

export type Ajax = {
  file: Function;
  img: Function;
  sound: Function;
};

export type Response = {
  success: boolean;
  message: string;
};
