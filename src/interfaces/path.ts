export interface IPath {
  'jcr:primaryType': string;
  'jcr:mixinTypes': string[];
  'jcr:createdBy': string;
  'jcr:lastModifiedBy': string;
  'jcr:created': string;
  'jcr:lastModified': string;
  'rep:policy': RepPolicy;
  'jcr:content': JcrContent;
  en: En;
  es: Es;
  'HT_pic_Brand_Hamburg_modern_iStock-501361712.jpg': HTPicBrandHamburgModernIStock501361712Jpg;
}

export interface HTPicBrandHamburgModernIStock501361712Jpg {
  'jcr:primaryType': string;
  'jcr:mixinTypes': string[];
  'jcr:createdBy': string;
  'jcr:created': string;
  'jcr:uuid': string;
}

export interface En {
  'jcr:primaryType': string;
  'jcr:createdBy': string;
  'jcr:lastModifiedBy': string;
  'jcr:created': string;
  'jcr:lastModified': string;
}

export interface Es {
  'jcr:primaryType': string;
  'jcr:createdBy': string;
  'jcr:created': string;
}

export interface JcrContent {
  'jcr:primaryType': string;
  'jcr:title': string;
  imageProfile?: string;
  'cq:conf': string;
}

export interface RepPolicy {
  'jcr:primaryType': string;
}
