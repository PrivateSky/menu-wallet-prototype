require("../privatesky/psknode/bundles/overwriteRequire.js");
require("../privatesky/psknode/bundles/edfsBar.js");

const fs = require("fs");
const DOSSIER_SEED_FILE_PATH = "dossier.seed";
const WALLET_SEED_FILE_PATH = "dossier.seed";
const EDFS = require("edfs");
const EDFS_ENDPOINT = "http://127.0.0.1:8080";
let edfs = EDFS.attachToEndpoint(EDFS_ENDPOINT);

fs.readFile(DOSSIER_SEED_FILE_PATH,(err, content)=>{
    if(err || content.length === 0){
        return createWallet();
    }
    const bar = edfs.loadBar(content);
    updateWallet(bar);
});

function createWallet(){
    const bar = edfs.createBar();
    updateWallet(bar);

}
function updateWallet(bar){
    bar.addFolder("/", "../code",(err, archiveDigest)=>{
        if(err){
            throw err;
        }
        fs.writeFile(DOSSIER_SEED_FILE_PATH, bar.getSeed(),(err)=>{
            if(err){
                throw err;
            }
        })
    });
}



