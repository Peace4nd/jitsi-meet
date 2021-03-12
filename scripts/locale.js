/* eslint-disable no-undef, max-len, camelcase */

const fs = require('fs');
const { merge } = require('lodash');
const path = require('path');
const { parseString } = require('xml2js');

// definice
const srcXml = path.resolve(__dirname, '../react/locale');
const srcJson = path.resolve(__dirname, '../lang');

// sracky k ignorovani
const skipShits = [ 'ko', 'la' ];

const map_jitsi2icewarp = {
    ar: 'ar',
    bg: 'bg',
    cs: 'cs',
    da: 'dk',
    de: 'de',
    el: 'el',
    enGB: 'en',
    es: 'es',
    fa: 'fa',
    fi: 'fi',
    fr: 'fr',
    he: 'he',
    hi: 'hi',
    hr: 'hr',
    hu: 'hu',
    is: 'is',
    it: 'it',
    ja: 'jp',
    ko: 'kr',
    lv: 'lv',
    nb: 'no',
    nl: 'nl',
    pl: 'pl',
    pt: 'pt',
    ro: 'ro',
    ru: 'ru',
    sk: 'sk',
    sv: 'se',
    th: 'th',
    tr: 'tr',
    uk: 'ua',
    zhCN: 'cn'
};

const map_icewarp2jitsi = {
    ar: 'ar',
    bg: 'bg',
    cs: 'cs',
    dk: 'da',
    de: 'de',
    el: 'el',
    en: 'enGB',
    es: 'es',
    fa: 'fa',
    fi: 'fi',
    fr: 'fr',
    he: 'he',
    hi: 'hi',
    hr: 'hr',
    hu: 'hu',
    is: 'is',
    it: 'it',
    jp: 'ja',
    kr: 'ko',
    lv: 'lv',
    no: 'nb',
    nl: 'nl',
    pl: 'pl',
    pt: 'pt',
    ro: 'ro',
    ru: 'ru',
    sk: 'sk',
    se: 'sv',
    th: 'th',
    tr: 'tr',
    ua: 'uk',
    cn: 'zhCN'
};

const helper_flatten = (obj, root = '') => {
    // definice
    const output = {};

    // prochazeni
    Object.entries(obj).forEach(entry => {
        const base = (root ? `${root}.` : '') + entry[0];

        if (typeof entry[1] === 'string') {
            output[base] = entry[1];
        } else {
            Object.assign(output, helper_flatten(entry[1], base));
        }
    });

    // vraceni
    return output;
};

const helper_expand = obj => {
    // definice
    let output = {};

    // prochazeni
    Object.entries(obj).forEach(entry => {
        // definice
        const keyValue = {};
        const keys = entry[0].split('.');
        const keysLength = keys.length;

        // nafouknuti objektu
        keys.reduce((accumulator, currentValue, index) => {
            // sestaveni
            if (index === keysLength - 1) {
                accumulator[currentValue] = entry[1];
            } else {
                accumulator[currentValue] = {};
            }

            // vraceni
            return accumulator[currentValue];
        }, keyValue);

        // merge
        output = merge(output, keyValue);
    });

    // vraceni
    return output;
};


const xml2flatten = xml => {
    // definice
    const flattened = {};

    // parsovani
    parseString(xml, (err, result) => {
        for (const resource of result.resources.string) {
            flattened[resource.$.name] = resource._ || undefined;
        }
    });

    // vraceni
    return flattened;
};


const flatten2xml = flattened => {
    // definice
    let xml = '';

    // sestavneni xml
    Object.entries(flattened).forEach(entry => {
        if (entry[1] !== undefined) {
            // nahrazeni entit
            const prepared = entry[1]
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');

            // sestaveni
            xml += `\t<string name="${entry[0]}">${prepared}</string>\n`;
        }
    });

    // vraceni
    return `<resources>\n${xml}</resources>`;
};


const json2xml = strings => {
    // definice
    const flattened = helper_flatten(strings);

    // vraceni
    return flatten2xml(flattened);
};

const importJitsi = () => {
    // definice
    const regex = /main-(.+)\.json/;
    const main = JSON.parse(fs.readFileSync(path.join(srcJson, 'main.json')).toString());

    fs.readdirSync(srcJson).forEach(file => {
        if (file.includes('main-')) {
            const match = regex.exec(file);
            const locale = map_jitsi2icewarp[match[1]];
            const strings = JSON.parse(fs.readFileSync(path.join(srcJson, file)).toString());
            const xml = json2xml(merge({}, main, strings));

            if (locale) {
                console.log('importing: ', locale);
                fs.writeFileSync(path.join(srcXml, locale, 'strings.xml'), xml);
            }
        }
    });
};

const exportIcewarp = () => {
    // nacteni adresaru
    fs.readdirSync(srcXml).forEach(locale => {
        if (fs.statSync(path.join(srcXml, locale)).isDirectory() && !skipShits.includes(locale)) {
            // log
            console.log('exporting: ', locale);

            // nafouknuti xml
            const parsed = xml2flatten(fs.readFileSync(path.join(srcXml, locale, 'strings.xml')).toString());
            const expanded = helper_expand(parsed);

            // zapis
            fs.writeFileSync(path.join(srcJson, `main-${map_icewarp2jitsi[locale]}.json`), `${JSON.stringify(expanded, null, 4)}\n`);
        }
    });
};

const updateIcewarp = () => {
    // nacteni updatu
    const parsed = xml2flatten(fs.readFileSync(path.join(srcXml, 'changes.xml')).toString());

    // nacteni adresaru
    fs.readdirSync(srcXml).forEach(locale => {
        if (fs.statSync(path.join(srcXml, locale)).isDirectory() && !skipShits.includes(locale)) {
            // log
            console.log('updating: ', locale);

            // nacteni prekladu
            const strings = xml2flatten(fs.readFileSync(path.join(srcXml, locale, 'strings.xml')).toString());

            // aktualizace
            Object.entries(parsed).forEach(entry => {
                if (entry[1] === undefined) {
                    if (entry[0].endsWith('*')) {
                        // definice
                        const found = [];
                        const pattern = new RegExp(`^${entry[0].substr(0, entry[0].length - 1)}.*$`);

                        // nalezeni odpovidajicich klicu
                        Object.keys(strings).forEach(key => {
                            if (pattern.exec(key) !== null) {
                                found.push(key);
                            }
                        });

                        // odstraneni
                        for (const key of found) {
                            delete strings[key];
                        }
                    } else {
                        delete strings[entry[0]];
                    }
                } else {
                    strings[entry[0]] = entry[1];
                }
            });

            // zapis
            fs.writeFileSync(path.join(srcXml, locale, 'strings.xml'), flatten2xml(strings));
        }
    });
};


// zpracovani
switch (process.argv[2]) {
    case 'import': {
        importJitsi();
        break;
    }
    case 'export': {
        exportIcewarp();
        break;
    }
    case 'update': {
        updateIcewarp();
        break;
    }
    default:
        throw new Error(`Unknown action '${process.argv[2]}'`);
}
