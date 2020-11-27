const EDFS_ENDPOINT = "http://localhost:8080";

const USER_DETAILS = "user-details.json";

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
    },

    getUserDetails: function() {
        if (!rawDossier) {
            return this.return(new Error("Raw Dossier is not available."));
        }
        rawDossier.readFile(USER_DETAILS, (err, fileContent) => {
            if(err) {
                return this.return(err);
            }
            const dataSerialization = fileContent.toString();
            return this.return(undefined, JSON.parse(dataSerialization));
        });
    },
});
