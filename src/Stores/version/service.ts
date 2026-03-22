
export type VersionInfo = {
    latestVersion: string,
    minVersion: string,
    whatsNew: string,
}

export async function getAppVersionInfo(): Promise<VersionInfo> {
    try {
        const response = await fetch('https://pixel-propx-solutions.github.io/.versions/info/pixel-wallet.json');
        const data = await response.json() as VersionInfo;
        return {...data, latestVersion: '2'};
    } catch(error) {
        throw Error(`Failed to fetch app version info from https://pixel-propx-solutions.github.io/.versions/info/pixel-wallet.json: ${error}`);
    }
}