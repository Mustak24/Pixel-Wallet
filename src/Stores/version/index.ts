import { createStore } from "@funtools/store";
import DeviceInfo from "react-native-device-info";
import { getAppVersionInfo } from "./service";
import { compareVersion } from "../../Utils";
import { VersionStorage as storage } from "../../Database/Storage";


const writeAt = storage.getNumber('writeAt') ?? 0;
const latestVersion = storage.getString('latestVersion') ?? '';
const minVersion = storage.getString('minVersion') ?? '';
const whatsNew = storage.getString('whatsNew') ?? '';
const isUpdateAvailable = compareVersion(DeviceInfo.getVersion(), latestVersion) === -1;
const forceUpdate = compareVersion(DeviceInfo.getVersion(), minVersion) === -1;


const {useStore, useHandlers} = createStore({
    states: {
        currentVersion: DeviceInfo.getVersion(),
        isRefreshing: false,
        isUpdateAvailable,
        forceUpdate,
        latestVersion,
        minVersion,
        whatsNew,
        writeAt,
    },

    asyncHandlers: {
        refreshInfo: async (states) => {
            const {isRefreshing} = useHandlers()
            try {
                isRefreshing.set(true);

                const {latestVersion, minVersion, whatsNew} = await getAppVersionInfo();
                const writeAt = Date.now();
                
                const isUpdateAvailable = compareVersion(states.currentVersion, latestVersion) === -1;
                const forceUpdate = compareVersion(states.currentVersion, minVersion) === -1;
          
                states.isUpdateAvailable = isUpdateAvailable;
                states.forceUpdate = forceUpdate;
                
                states.latestVersion = latestVersion;
                states.minVersion = minVersion;
                states.whatsNew = whatsNew;
                states.writeAt = writeAt;
                
                
                storage.set('isUpdateAvailable', isUpdateAvailable);
                storage.set('forceUpdate', forceUpdate);
                
                storage.set('latestVersion', latestVersion);
                storage.set('minVersion', minVersion);
                storage.set('whatsNew', whatsNew);
                storage.set('writeAt', writeAt);
            } catch(error) {
                console.error('Failed to refresh info: ', error);
            } finally {
                isRefreshing.set(false)
            }
        }
    }
})


if(Date.now() - writeAt > 1000 * 60 * 60 * 24) {
    useHandlers().refreshInfo();
}

export {
    useStore as useVersionStore,
    useHandlers as useVersionHandlers,
}