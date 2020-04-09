let updater = require("updater");
const config = {
    workDir: '.',
    dependencies: [
       {
            "name":"cardinal",
            "src":"https://github.com/privatesky/cardinal.git",
            "actions":[
                {
                    "type": "smartClone",
                    "target": "./temp"
                },
                {
                    "type": "execute",
                    "cmd": "cd ./temp/cardinal && npm install && npm run build"
                },
                {
                    "type": "copy",
                    "src": "./temp/cardinal/dist/cardinal",
                    "target":"./code/cardinal",
                    "options":{
                        "overwrite":true
                    }
                },
                {
                    "type": "copy",
                    "src": "./temp/cardinal/dist/cardinal.js",
                    "target":"./code/cardinal.js",
                    "options":{
                        "overwrite":true
                    }
                },
                {
                    "type": "remove",
                    "target": "./temp",
                }
            ]
        },

    ]
};

updater.setTag("[Install menu-wallet]");
updater.run(config, function(err){
    if(err){
        throw err;
    }
    console.log("Finished updating cardinal")
});
