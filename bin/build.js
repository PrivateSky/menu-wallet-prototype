let updater = require("updater");
const config = {
    workDir: '.',
    dependencies: [
        {
            "name": "menu-wallet",
            "src": "",
            "actions":[
                {
                    "type": "mkdir",
                    "target": "temp/wallet-app"
                },
                {
                    "type": "copy",
                    "src": "./app",
                    "target": "./temp/wallet-app",
                    "options":{
                        "overwrite": true
                    }
                },
                {
                    "type": "copy",
                    "src": "./loader/template",
                    "target": "./temp/wallet-app",
                    "options":{
                        "overwrite": true
                    }
                }
            ]
        }
    ]
};

updater.setTag("[Build menu-wallet]");
updater.run(config, function(err){
    if(err){
        throw err;
    }
    console.log("Finished updating cardinal")
});
