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
        this.__appNameChangeListener();
    }

    __setAppName = () => {
        const appName = this.element.getAttribute("data-app-name");
        if (appName && appName.trim().length) {
            this.model.setChainValue("appName", appName);
            console.log("[appName]", appName);
        }
    }

    __appNameChangeListener = () => {
        this.model.onChange("appName", () => {
            this.__getKeySSI();
        });
    }

    __getKeySSI = () => {
        this.walletTemplateService.printKeySSI(APPS_FOLDER, this.model.appName, (err, keySSI) => {
            if (err) {
                return console.error(err);
            }

            this.model.setChainValue("keySSI", keySSI);
        });
    }
}