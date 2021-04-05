type Pair = {
  x: number;
  y: number;
};

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
  userdata?: Userdata;
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

function s7RIJSONResponse(obj: IS7RIJSONResponse, id: string) {
  return obj;
}

async function originalImageSize(img?: string): Promise<Pair | undefined> {
  const resp = fetch(img + '?req=set,json&handler=s7RIJSONResponse')
    .then((res) => res.text())
    .then((res) => eval(res));

  console.log(resp);

  const pair: Readonly<Pair> = { x: 3, y: 4 };

  return pair;
}

function setNewImage(img: Element, newImage: string) {
  img.setAttribute('src', newImage);
}

async function getRenditions(url: string): Promise<string[] | undefined> {
  const relations: IS7RIJSONResponse = await fetch(
    url + '?req=set,json&handler=s7RIJSONResponse'
  )
    .then((r) => r.text())
    .then((res) => eval(res));

  if (relations.set.relation)
    return relations.set.relation.map(
      (relation) => relation.userdata.SmartCropDef
    );

  if (relations.set.item.userdata) {
    return [relations.set.item.userdata.SmartCropDef];
  }
}

async function getRenditionObject(images: Element[]) {
  const map = await Promise.all(
    images.map(async (img) => {
      const renditions = await getRenditions(img.getAttribute('data-image'));
      return [img.getAttribute('id'), renditions];
    })
  );

  return map.reduce((obj, curr) => {
    const [key, val] = curr as [string, any];
    return { ...obj, [key]: val };
  }, {});
}

export async function responsiveImage() {
  const images = Array.from(document.querySelectorAll('[data-responsive]'));

  // const renditionObject = await getRenditionObject(images);

  const ro = new ResizeObserver((elements) => {
    for (const e of elements) {
      const [width, height] = [e.target.clientWidth, e.target.clientHeight];

      const currentSrc = e.target.getAttribute('data-image');

      e.target.setAttribute('src', currentSrc + `?wid=${width}`);
    }
  });

  images.forEach((img) => ro.observe(img));
}
