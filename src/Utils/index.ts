export function compareVersion(_v1: string, _v2: string) {
    const v1 = _v1.split('.').map(Number);
    const v2 = _v2.split('.').map(Number);

    const maxLen = Math.max(v1.length, v2.length);
    for (let i = 0; i < maxLen; i++) {
        const n1 = v1[i] || 0;
        const n2 = v2[i] || 0;

        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
    }

    return 0;
}