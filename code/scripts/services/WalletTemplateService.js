class WalletTemplateService {

    constructor() {
        const HostBootScript = require("boot-host").HostBootScript;
        new HostBootScript("wallet-template-service");
    }

    printKeySSI(path, appName, callback) {
        $$.interaction.startSwarmAs("test/agent/007", "readDir", "printKeySSI", path, appName).onReturn(callback);
    }
}

let walletTemplateService = new WalletTemplateService();
let getWalletTemplateServiceInstance = function() {
    return walletTemplateService;
}

export {
    getWalletTemplateServiceInstance
};