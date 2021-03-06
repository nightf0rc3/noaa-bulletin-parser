
export const parseBulletin = (rawBltn: string) => {
    const UID_RGX = /(T\S{5}) KNES (\d{6})/;
    const NAME_RGX = /A.\s{2}(.*(\((.*)\)))/;
    const DATE_RGX = /B.\s{2}((\d{2})\/(\d{2})(\d{2})Z)/;
    const LAT_RGX = /C.\s{2}(\d{1,3}\.\d\w)/;
    const LON_RGX = /D.\s{2}(\d{1,3}\.\d\w)/;
    const E_RGX = /E.\s{2}(\S*\/(.*))/;
    const DVORAK_RGX = /F.\s\s((T|ST)(\d\.\d)\/(\d\.\d)\/(D|W|S)(\d\.\d)\/(\d\d)HRS)|(OVERLAND)|(TOO WEAK)/;
    const G_RGX = /G.\s{2}(.*)/;
    const TEXT_RGX = /H.\s{2}REMARKS...(.*(\n.*)*)I\./;
    // const I_RGX = /I.\s{2}(.*)/;
    try {
        const dvorak = DVORAK_RGX.exec(rawBltn);
        const ident = UID_RGX.exec(rawBltn);
        const date = DATE_RGX.exec(rawBltn);
        const other = (dvorak[8] === undefined) ? dvorak[9] : dvorak[8];
        const values = {
            t: other,
            maxWinds: 0,
            category: other,
        };
        return {
            name: NAME_RGX.exec(rawBltn)[3],
            fullTag: NAME_RGX.exec(rawBltn)[1],
            stormId: ident[1],
            bltnInc: ident[2],
            date: {
                day: date[2],
                hour: date[3],
                minute: date[4]
            },
            lat: LAT_RGX.exec(rawBltn)[1],
            lng: LON_RGX.exec(rawBltn)[1],
            details: {
                tropical: (dvorak[1] === undefined) ? other : dvorak[2],
                satelliteT: (dvorak[1] !== undefined) ? convertDvorakT2Details(dvorak[3]) : values,
                currentT: (dvorak[1] !== undefined) ? convertDvorakT2Details(dvorak[4]) : values,
                change: {
                    status: (dvorak[1] !== undefined) ? dvorak[5] : 'O',
                    amount: (dvorak[1] !== undefined) ? dvorak[6] : '0.0',
                    time: (dvorak[1] !== undefined) ? dvorak[7] : '24'
                }
            },
            satellite: E_RGX.exec(rawBltn)[2],
            g: G_RGX.exec(rawBltn)[1],
            text: TEXT_RGX.exec(rawBltn)[1],
            // other: I_RGX.exec(rawBltn)[1],
        };
    } catch (err) {
        throw err;
    }

};

export const convertDvorakT2Details = (dvorakT: string) => {
    const values = {
        t: dvorakT,
        maxWinds: 29,
        category: 'TD',
    };
    switch (dvorakT) {
        case '2.0':
            values.maxWinds = 35;
            values.category = 'TD';
            break;
        case '2.5':
            values.maxWinds = 40;
            values.category = 'TS';
            break;
        case '3.0':
            values.maxWinds = 52;
            values.category = 'TS';
            break;
        case '3.5':
            values.maxWinds = 63;
            values.category = 'TS';
            break;
        case '4.0':
            values.maxWinds = 75;
            values.category = 'Cat 1';
            break;
        case '4.5':
            values.maxWinds = 89;
            values.category = 'Cat 1';
            break;
        case '5.0':
            values.maxWinds = 104;
            values.category = 'Cat 2';
            break;
        case '5.5':
            values.maxWinds = 117;
            values.category = 'Cat 3';
            break;
        case '6.0':
            values.maxWinds = 132;
            values.category = 'Cat 4';
            break;
        case '6.5':
            values.maxWinds = 146;
            values.category = 'Cat 4';
            break;
        case '7.0':
            values.maxWinds = 161;
            values.category = 'Cat 5';
            break;
        case '7.5':
            values.maxWinds = 178;
            values.category = 'Cat 5';
            break;
        case '8.0':
            values.maxWinds = 196;
            values.category = 'Cat 5';
            break;
        case '8.5':
            values.maxWinds = 213;
            values.category = 'Cat 5';
            break;
        default:
            break;

    }
    return values;
};
