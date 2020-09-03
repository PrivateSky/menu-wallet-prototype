import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import { getWalletTemplateServiceInstance } from "../services/WalletTemplateService.js";

const APPS_FOLDER = "/apps";

export default class WalletSsappLauncher extends ContainerController {
    constructor(element, history) {
        super(element, history);

        this.model = this.setModel({
            appName: null,
            keySSI: null
        });
        this.walletTemplateService = getWalletTemplateServiceInstance();

        this.__setAppName();
    }

    __setAppName = () => {
        const appName = this.element.getAttribute("data-app-name");
        if (appName && appName.trim().length) {
            this.__setAppNameAttribute(appName);
            this.__getKeySSI(appName);
        }
    }

    __setAppNameAttribute = (appName) => {
        const pskSsappElement = this.element.querySelector("psk-ssapp");
        if (pskSsappElement) {
            pskSsappElement.setAttribute("app-name", appName);
        }
    }

    __getKeySSI = (appName) => {
        this.walletTemplateService.getKeySSI(APPS_FOLDER, appName, (err, keySSI) => {
            if (err) {
                return console.error(err);
            }

            this.model.setChainValue("keySSI", keySSI);
            console.log("[Open SSAPP] " + appName + " with KeySSI: " + keySSI);
        });
    }
}