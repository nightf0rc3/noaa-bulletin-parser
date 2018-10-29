export declare const parseBulletin: (rawBltn: string) => {
    name: string;
    fullTag: string;
    date: {
        day: string;
        hour: string;
        minute: string;
    };
    lat: string;
    lng: string;
    details: {
        tropical: string;
        satelliteT: {
            t: string;
            maxWinds: number;
            category: string;
        };
        currentT: {
            t: string;
            maxWinds: number;
            category: string;
        };
        change: {
            status: string;
            amount: string;
            time: string;
        };
    };
    satellite: string;
    g: string;
    text: string;
};
export declare const convertDvorakT2Details: (dvorakT: string) => {
    t: string;
    maxWinds: number;
    category: string;
};
