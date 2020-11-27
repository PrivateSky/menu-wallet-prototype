class WalletTemplateService {

    constructor() {
        const HostBootScript = require("boot-host").HostBootScript;
        new HostBootScript("wallet-template-service");
    }

    getKeySSI(path, appName, callback) {
        $$.interaction.startSwarmAs("test/agent/007", "readDir", "getKeySSI", path, appName).onReturn(callback);
    }

    getUserDetails(callback) {
        $$.interaction.startSwarmAs("test/agent/007", "readDir", "getUserDetails").onReturn(callback);
    }
}

let walletTemplateService = new WalletTemplateService();
let getWalletTemplateServiceInstance = function() {
    return walletTemplateService;
}

export {
    getWalletTemplateServiceInstance
};