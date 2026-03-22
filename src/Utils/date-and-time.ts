export type DateObj = { year: number, month: number, date: number };

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export function getDaysInMonth(monthIndex: number, year?: number): number {
    if (monthIndex < 0 || monthIndex > 11) {
        throw new Error("Month index must be between 0 (January) and 11 (December).");
    }

    year ??= new Date().getFullYear();

    return new Date(year, monthIndex + 1, 0).getDate();
}


export function getMonthRange(month?: number, year?: number): { from: DateObj, to: DateObj } {
    month ??= new Date().getMonth();
    year ??= new Date().getFullYear();

    return {
        from: { year, month, date: 1 },
        to: { year, month, date: getDaysInMonth(month) }
    }
}


export function compareDateObj(date1: DateObj, date2?: DateObj): -1 | 0 | 1 {
    if (!date2) {
        const time = new Date();
        date2 = { year: time.getFullYear(), month: time.getMonth(), date: time.getDate() };
    }

    const { date: d1, month: m1, year: y1 } = date1;
    const { date: d2, month: m2, year: y2 } = date2;

    if (y1 < y2) { return -1; }
    if (y1 > y2) { return 1; }

    if (m1 < m2) { return -1; }
    if (m1 > m2) { return 1; }

    if (d1 < d2) { return -1; }
    if (d1 > d2) { return 1; }

    return 0;
}

export function compareDateRange(
    range1: { from: DateObj; to: DateObj },
    range2?: { from: DateObj; to: DateObj }
): -1 | 0 | 1 {

    const fromCompare = compareDateObj(range1.from, range2?.from);
    if (fromCompare !== 0) {
        return fromCompare;
    }

    const toCompare = compareDateObj(range1.to, range2?.to);
    if (toCompare !== 0) {
        return toCompare;
    }

    return 0;
}


export function validateDateRange(range: { from: DateObj; to: DateObj }, bounds?: { min?: DateObj; max?: DateObj }): { from: DateObj; to: DateObj } {
    let { from, to } = range;

    const now = new Date();

    const min: DateObj = bounds?.min ?? { year: 1947, month: 0, date: 1 };
    const max: DateObj = bounds?.max ?? {
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
    };

    if (compareDateObj(from, to) === 1) {
        from = to;
    }

    if (compareDateObj(from, min) === -1) {
        from = min;
    }

    if (compareDateObj(from, max) === 1) {
        from = max;
    }

    if (compareDateObj(to, min) === -1) {
        to = min;
    }

    if (compareDateObj(to, max) === 1) {
        to = max;
    }

    return { from, to };
}


export function validateDate(date: DateObj, bounds?: { min?: DateObj; max?: DateObj }): DateObj {
    const now = new Date();

    const min: DateObj = bounds?.min ?? { year: 1947, month: 0, date: 1 };
    const max: DateObj = bounds?.max ?? {
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
    };

    if (compareDateObj(date, min) === -1) return min;
    if (compareDateObj(date, max) === 1) return max;

    return date;
}


export function localDateRangeToUTC(startDateStr: string, endDateStr: string) {
    if (startDateStr === "" || endDateStr === "") {
        return { startUTC: "", endUTC: "" };
    }
    console.log("Converting local date range to UTC:", startDateStr, endDateStr);
    const startLocal = new Date(startDateStr);
    startLocal.setHours(0, 0, 0, 0);

    const endLocal = new Date(endDateStr);
    endLocal.setHours(0, 0, 0, 0);
    endLocal.setDate(endLocal.getDate() + 1);

    console.log("Converted UTC dates:", startLocal.toISOString(), endLocal.toISOString());

    return {
        startUTC: startLocal.toISOString(),
        endUTC: endLocal.toISOString()
    };
}

export function utcToActualLocalISO(utcString: string) {
    const d = new Date(utcString);

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
        `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}