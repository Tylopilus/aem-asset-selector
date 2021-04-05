import { Image as IImage } from './interfaces/image';
import { IPath } from './interfaces/path';
import * as IProfiles from './interfaces/IProfiles';
import { IAEMPostMessage } from './interfaces/IAEMPostMessage';
import { IS7RIJSONResponse } from './interfaces/IS7RIJSONResponse';
const constants = {
  HOST: 'http://localhost:4502',
  NOHTTP_HOST: 'localhost:4502',
  IMAGE_PROFILES_URL:
    '/conf/global/settings/dam/adminui-extension/imageprofile.1.json',
  ASSET_SELECTOR_URL: '/aem/assetpicker',
  AUTH_TYPE_ASSET_SELECTOR: 'authType=EAEM_ASSET_SELECTOR',
  // USER: 'eaem-read-only-user',
  USER: 'admin',
  // PASSWORD: 'eaem-read-only-user',
  PASSWORD: 'admin',
  PUBLISH_SERVER: 'https://s7d2.scene7.com',
  COMPANY_NAME: 'DynamicMediaNA',
};

async function getImageProfiles(
  host: string,
  profileUrl: string
): Promise<IProfiles.IMetaProfiles> {
  return await fetch(host + profileUrl, {
    credentials: 'include',
    headers: {
      'Content-Type': 'text/plain',
      Authorization: 'Basic ' + btoa(`${constants.USER}:${constants.PASSWORD}`),
    },
  })
    .then((res) => res.json())
    .catch((e) => new Error(e));
}

async function getPathObject(path: string): Promise<IPath> {
  return await fetch(constants.HOST + path + '.1.json', {
    credentials: 'include',
    headers: {
      'Content-Type': 'text/plain',
      Authorization: 'Basic ' + btoa(`${constants.USER}:${constants.PASSWORD}`),
    },
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
}

async function getAppliedProfile(
  profiles: {},
  imagePath: string
): Promise<string> {
  const paths = imagePath.slice(1).split('/');
  let length = paths.length;
  // format is /content/dam/FOLDER/imageName.jpg
  if (paths.length < 4)
    throw Error('Selected Image has no dynamic media profile');

  // profiles can only be set on X folders, eg. /content/dam/x - so skip less
  while (length > 3) {
    paths.reverse().shift(); // remove image-name from path
    const path = '/' + paths.reverse().join('/');

    for (const profile in profiles) {
      const pathObject = await getPathObject(path);
      if (pathObject['jcr:content'].imageProfile?.includes(profile)) {
        return profile;
      }
    }
    length--;
  }

  throw Error('Selected Image has no dynamic media profile');
}

async function getImageData(imageUrl: string): Promise<IImage> {
  return await fetch(imageUrl + '.2.json', {
    credentials: 'include',
    headers: {
      'Content-Type': 'text/plain',
      Authorization: 'Basic ' + btoa(`${constants.USER}:${constants.PASSWORD}`),
    },
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
}

function getRenditions(profile: IProfiles.IDynamicProfile): string[] {
  const renditions = profile?.banner?.split('|');

  return renditions?.map((r) => r.split(',')[0]);
  // return renditions;
}
async function generateJson(
  data: IAEMPostMessage,
  profiles: IProfiles.IMetaProfiles
) {
  const payload = data.data[0];
  const cleanedProfiles: { [key: string]: IProfiles.IDynamicProfile } = {};
  Object.keys(profiles)
    .filter(
      (key) =>
        !key.startsWith('jcr:') &&
        (<IProfiles.IDynamicProfile>profiles[key]).crop_type === 'crop_smart'
    )
    .forEach((key) => {
      cleanedProfiles[key] = profiles[key] as IProfiles.IDynamicProfile;
    });

  try {
    const imageProfile = await getAppliedProfile(cleanedProfiles, payload.path);

    const profile = cleanedProfiles[imageProfile];
    profile.imageProfile = imageProfile;

    profile.renditions = getRenditions(profile);
    const image = await getImageData(payload.url);

    const metadata = image['jcr:content'].metadata;
    if (!metadata['dam:scene7Domain'])
      throw Error('Image has not been processed yet');
    profile.dynamicMediaBase =
      metadata['dam:scene7Domain'] + 'is/image/' + metadata['dam:scene7File'];

    const dynamicUrls = profile.renditions.map((rendition) => {
      return profile.dynamicMediaBase + ':' + rendition;
    });
    profile.dynamicMediaUrls = dynamicUrls;
    profile.publishState = metadata['dam:scene7FileStatus'];

    delete profile['jcr:primaryType'];
    delete profile.crop_type;

    return profile;
  } catch (e) {
    console.error(e);
  }
}

function s7RIJSONResponse(obj: IS7RIJSONResponse, id: string) {
  const res = obj.set.relation?.map((r) => r);
  return res;
}

function Init(): void {
  let popup: Window = null;
  let profiles: IProfiles.IMetaProfiles = null;

  window.addEventListener('message', async (e: MessageEvent) => {
    if (e.origin !== constants.HOST) {
      return;
    }
    const data = JSON.parse(e.data) as IAEMPostMessage;
    if (data.config.action === 'done') {
      const imageName = data.data[0].title.substring(
        0,
        data.data[0].title.lastIndexOf('.')
      );
      //TODO: Make this a proper Type
      const obj: any = {};
      const url = `${constants.PUBLISH_SERVER}/is/image/${constants.COMPANY_NAME}/${imageName}?req=set,json&handler=s7RIJSONResponse`;
      const scene7Res = await fetch(url).then((r) => r.text());
      obj.base = `${constants.PUBLISH_SERVER}/is/image`;
      const renditions = eval(scene7Res);
      if (renditions) obj.renditions = renditions;

      console.log(obj);

      const output = await generateJson(data, profiles);
      if (output) {
        console.log(JSON.stringify(output));
        postMessage(output, '*');
      }
    }
    popup.close();
  });

  document
    .getElementById('selectButton')
    .addEventListener('click', async () => {
      const img = document.querySelector('[data-responsive]');
      img.setAttribute(
        'src',
        'https://s7d2.scene7.com/is/image/DynamicMediaNA/cq5dam.cropped.1360.763:Large'
      );
      try {
        profiles = await getImageProfiles(
          constants.HOST,
          constants.IMAGE_PROFILES_URL
        );
      } catch (e) {
        console.error(e);
      }

      // frame.show();
      popup = window.open(
        constants.HOST + constants.ASSET_SELECTOR_URL,
        'blank',
        'left=25%,top=25%,height=800,width=800,status=no,toolbar=no,menubar=no'
      );
    });
}

export default Init;
