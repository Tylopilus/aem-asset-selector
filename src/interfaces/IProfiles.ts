export interface IMetaProfiles {
  'jcr:primaryType': string;
  'jcr:createdBy': string;
  'jcr:created': string;
  [key: string]: IDynamicProfile | string;
}

export interface IDynamicProfile {
  'jcr:primaryType': string;
  usmRadius: string;
  usmThreshold: string;
  banner?: string;
  swatch?: string;
  usmMonochrome: string;
  crop_type: string;
  usmAmount: string;
  crop?: string;
  imageProfile?: string;
  renditions?: string[];
  dynamicMediaBase?: string;
  dynamicMediaUrls?: string[];
  publishState?: string;
}
