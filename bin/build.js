require("./../../privatesky/psknode/bundles/csbBoot.js");
require("./../../privatesky/psknode/bundles/edfsBar.js");
const fs = require("fs");
const DOSSIER_SEED_FILE_PATH = "./loader/web-loader/seed.js";
const EDFS = require("edfs");
const EDFS_ENDPOINT = "http://127.0.0.1:8080";
let edfs = EDFS.attachToEndpoint(EDFS_ENDPOINT);

function storeSeed(seed_path, seed, callback) {
    let jsonSeed = `export default {seed:"${seed}"}`;
    fs.writeFile(seed_path, jsonSeed, (err) => {
        return callback(err, seed);
    });
}

function createWallet(callback) {
    const bar = edfs.createBar();
    updateWallet(bar, callback);
}

function updateWallet(bar, callback) {

    console.log("update wallet");
    bar.addFolder("code", "code", (err, archiveDigest) => {
        if (err) {
            return callback(err);
        }
        //TODO fix this by iterating through /apps
        fs.readFile("./apps/profile-app/seed", (err, content) => {
            if (err || content.length === 0) {
                storeSeed(DOSSIER_SEED_FILE_PATH, bar.getSeed(), callback);
            }
            let dossier = edfs.loadRawDossier(bar.getSeed());

            dossier.listFiles("/code/constitution", (err, files) => {
                console.log(err, files);
            });
            dossier.mount("/apps", "profileApp", content, (err) => {
                if (err) {
                    return callback(err);
                }
                storeSeed(DOSSIER_SEED_FILE_PATH, bar.getSeed(), callback);
            });
        });

    });
}

function build(callback) {
    fs.readFile(DOSSIER_SEED_FILE_PATH, (err, content) => {
        if (err || content.length === 0) {
            return createWallet(callback);
        }
        const bar = edfs.loadBar(content);
        updateWallet(bar, callback);
    });
}

build(function (err, seed) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Menu-Wallet Seed:", seed);
});
