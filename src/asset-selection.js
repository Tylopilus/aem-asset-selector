"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants = {
    HOST: 'http://localhost:4502',
    IMAGE_PROFILES_URL: '/conf/global/settings/dam/adminui-extension/imageprofile.1.json',
    ASSET_SELECTOR_URL: '/aem/assetpicker',
    AUTH_TYPE_ASSET_SELECTOR: 'authType=EAEM_ASSET_SELECTOR',
};
function ImageProfiles(host, profileUrl, authType) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(host + profileUrl + `?${authType}`)
            .then((res) => res.json())
            .catch((e) => new Error(e));
    });
}
function Init() {
    document
        .getElementById('selectButton')
        .addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
        try {
            const profiles = yield ImageProfiles(constants.HOST, constants.IMAGE_PROFILES_URL, constants.AUTH_TYPE_ASSET_SELECTOR);
            console.log(profiles, 'hi mooom');
        }
        catch (e) {
            console.error(e);
        }
        // const frame = lightBox.create(`
        //   <div>
        //     Hi Mom!
        //   </div>
        // `);
        // frame.show();
    }));
}
exports.default = Init;
