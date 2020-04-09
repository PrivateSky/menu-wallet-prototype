let updater = require("updater");
const config = {
    workDir: '.',
    dependencies: [
        {
            "name":"web-loader",
            "src":"https://github.com/PrivateSky/web-dossier-loader.git",
            "actions":[
                {
                    "type": "smartClone",
                    "target": "./loader/"
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
