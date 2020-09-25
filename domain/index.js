const EDFS_ENDPOINT = "http://localhost:8080";

$$.swarms.describe("readDir", {
    getKeySSI: function(path, mountPoint) {
        if (rawDossier) {
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
