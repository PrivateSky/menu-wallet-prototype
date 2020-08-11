const DOSSIER_SEED_FILE_PATH = "./seed";
const CARDINAL_SEED_FILE_PATH = "../cardinal/seed";
const THEMES_PATH = "../themes";
const BRICK_STORAGE_ENDPOINT = process.env.SSAPPS_FAVORITE_EDFS_ENDPOINT || "http://127.0.0.1:8080";

require("./../../privatesky/psknode/bundles/csbBoot.js");
require("./../../privatesky/psknode/bundles/edfsBar.js");
const fs = require("fs");
const EDFS = require("edfs");
$$.BDNS.addConfig("default", {
    endpoints: [
        {
            endpoint: BRICK_STORAGE_ENDPOINT,
            type: 'brickStorage'
        },
        {
            endpoint: BRICK_STORAGE_ENDPOINT,
            type: 'anchorService'
        }
    ]
})
function getCardinalDossierSeed(callback){
    fs.readFile(CARDINAL_SEED_FILE_PATH, (err, content)=>{
        if (err || content.length === 0) {
            return callback(err);
        }
        callback(undefined, content.toString());
    })
}

function getThemeDossierSeed(themeName, callback){

    fs.readFile(`${THEMES_PATH}/${themeName}/seed`, (err, content)=>{
        if (err || content.length === 0) {
            return callback(err);
        }
        callback(undefined, content.toString());
    })
}

function storeSeed(seed_path, seed, callback) {
    fs.writeFile(seed_path, seed, (err) => {
        return callback(err, seed);
    });
}

function createDossier(callback) {
    EDFS.createDSU("Bar", (err, bar) => {
        if (err) {
            return callback(err);
        }

        updateDossier(bar, callback);
    })
}

function updateDossier(bar, callback) {
    bar.delete("/", function(err){
        if(err){
            throw err;
        }

        bar.addFolder("code", "/", (err, archiveDigest) => {
            if (err) {
                return callback(err);
            }

            bar.getKeySSI((err, keySSI) => {
                if (err) {
                    return callback(err);
                }

                EDFS.resolveSSI(keySSI, "RawDossier", (err, loadedDossier) => {
                    if(err){
                        return callback(err);
                    }

                    getCardinalDossierSeed((err, cardinalSeed)=>{
                        if (err) {
                            return callback(err);
                        }
                        loadedDossier.mount("/cardinal", cardinalSeed, (err) => {
                            if (err) {
                                return callback(err);
                            }
                            loadedDossier.getKeySSI((err, loadedDossierKeySSI) => {
                                if (err) {
                                    return callback(err);
                                }

                                try {
                                    let themeNames = fs.readdirSync(THEMES_PATH);
                                    function addTheme(theme, callback){
                                        getThemeDossierSeed(theme,(err, themeSeed) => {
                                            if (err) {
                                                return callback(err);
                                            }

                                            loadedDossier.mount(`/themes/${theme}`, themeSeed, (err) => {
                                                if (err) {
                                                    return callback(err);
                                                }

                                                if(themeNames.length !== 0){
                                                    addTheme(themeNames.pop(), callback);
                                                }else{
                                                    return callback();
                                                }
                                            });
                                        })
                                    }

                                    if(themeNames.length > 0){
                                        addTheme(themeNames.pop(), function(err){
                                            if (err) {
                                                return callback(err);
                                            }
                                            storeSeed(DOSSIER_SEED_FILE_PATH, loadedDossierKeySSI, callback);
                                        })
                                    }else{
                                        storeSeed(DOSSIER_SEED_FILE_PATH, loadedDossierKeySSI, callback);
                                    }
                                } catch (e) {
                                    storeSeed(DOSSIER_SEED_FILE_PATH, loadedDossierKeySSI, callback);
                                }
                            });
                        })
                    })
                })
            });
        });
    });
}

function build(callback) {
    fs.readFile(DOSSIER_SEED_FILE_PATH, (err, content) => {
        if (err || content.length === 0) {
            console.log(`Creating a new Dossier...`);
            return createDossier(callback);
        }

        let keySSI;
        try {
            keySSI = require("key-ssi-resolver").KeySSIFactory.create(content.toString());
        } catch (err) {
            console.log("Invalid seed. Creating a new Dossier...");
            return createDossier(callback);
        }

        if(keySSI.getHint() !== BRICK_STORAGE_ENDPOINT){
            console.log("Endpoint change detected. Creating a new Dossier...");
            return createDossier(callback);
        }

        console.log("Dossier updating...");
        EDFS.resolveSSI(content.toString(),"Bar", (err, bar) => {
            if (err) {
                return callback(err);
            }

            updateDossier(bar, callback);
        });
    });
}

build(function (err, seed) {
    let path = require("path");
    let projectName = path.basename(path.join(__dirname, "../"));
    if (err) {
        console.log(`Build process of <${projectName}> failed.`);
        console.log(err);
        process.exit(1);
    }
    console.log(`Build process of <${projectName}> finished. Dossier Seed:`, seed);
});
