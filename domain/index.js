const EDFS_ENDPOINT = "http://localhost:8080";

$$.BDNS.addConfig("default", {
    endpoints: [{
            endpoint: EDFS_ENDPOINT,
            type: "brickStorage"
        },
        {
            endpoint: EDFS_ENDPOINT,
            type: "anchorService"
        }
    ]
});

$$.swarms.describe("readDir", {
    printKeySSI: function(path, mountPoint) {
        if (rawDossier) {
            debugger;
            return rawDossier.listMountedDossiers(path, (err, result) => {
                if (err) {
                    return this.return(err);
                }

                let selectedDsu = result.find((dsu) => dsu.path === mountPoint);
                if (!selectedDsu) {
                    return this.return(new Error(`Dossier with the name ${mountPoint} was not found in the mounted points!`));
                }

                this.return(undefined, selectedDsu.identifier);
            });
        }
        this.return(new Error("Raw Dossier is not available."));
    }
});