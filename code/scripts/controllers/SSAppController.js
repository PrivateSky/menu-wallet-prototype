export default class SSAppController{
    constructor(element){

        let manifest;

        function getManifest(callback) {

            if (!manifest) {
                fetch("/download/manifest").then((response) => {
                    response.text().then(data => {
                        manifest = JSON.parse(data);
                        callback(undefined, manifest);
                    }).catch((err) => {
                        callback(err);
                    })
                });
            }
            else {
                callback(undefined, manifest);
            }

        }


        element.addEventListener("giveMeSeed",(event)=>{
            let appName = event.detail.appName;
            let eventCallback = event.detail.callback;

            getManifest((err, manifest) => {
                if (err) {
                    throw err;
                }
                if (manifest.mounts) {
                    for (let i = 0; i < manifest.mounts.length; i++) {
                        if (manifest.mounts[i].mountName === appName) {
                            return eventCallback(undefined, manifest.mounts[i].archiveIdentifier);
                        }
                    }
                }
                return eventCallback(new Error("No seed for app "+appName));

            })

        })

    }
}
