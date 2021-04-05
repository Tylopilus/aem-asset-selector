export interface IS7RIJSONResponse {
  set: Set;
}

export interface Set {
  pv: string;
  type: string;
  n: string;
  relation?: Relation[];
  item: Item;
}

export interface Item {
  relation?: Relation[];
  i: I;
  dx: string;
  dy: string;
  iv: string;
  userData?: Userdata;
}

export interface I {
  n: string;
}

export interface Relation {
  n: string;
  type: string;
  userdata: Userdata;
}

export interface Userdata {
  SmartCropType: string;
  SmartCropWidth: string;
  SmartCropRect: string;
  SmartCropDef: string;
  SmartCropHeight: string;
}
