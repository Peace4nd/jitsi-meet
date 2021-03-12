// @flow

import i18next from 'i18next';

/**
 * The builtin languages.
 */
const _LANGUAGES = {
    // Arabic
    'ar': {
        languages: require('../../../../lang/languages-ar'),
        main: require('../../../../lang/main-ar')
    },

    // Bulgarian
    'bg': {
        languages: require('../../../../lang/languages-bg'),
        main: require('../../../../lang/main-bg')
    },

    // Czech
    'cs': {
        languages: require('../../../../lang/languages-cs'),
        main: require('../../../../lang/main-cs')
    },

    // Dansk
    'da': {
        languages: require('../../../../lang/languages-da'),
        main: require('../../../../lang/main-da')
    },

    // German
    'de': {
        languages: require('../../../../lang/languages-de'),
        main: require('../../../../lang/main-de')
    },

    // Greek
    'el': {
        languages: require('../../../../lang/languages-el'),
        main: require('../../../../lang/main-el')
    },

    // English (United Kingdom)
    'enGB': {
        languages: require('../../../../lang/languages-enGB'),
        main: require('../../../../lang/main-enGB')
    },

    // Spanish
    'es': {
        languages: require('../../../../lang/languages-es'),
        main: require('../../../../lang/main-es')
    },

    // Persian
    'fa': {
        languages: require('../../../../lang/languages-fa'),
        main: require('../../../../lang/main-fa')
    },

    // Finnish
    'fi': {
        languages: require('../../../../lang/languages-fi'),
        main: require('../../../../lang/main-fi')
    },

    // French
    'fr': {
        languages: require('../../../../lang/languages-fr'),
        main: require('../../../../lang/main-fr')
    },

    // Hebrew
    'he': {
        languages: require('../../../../lang/languages-he'),
        main: require('../../../../lang/main-he')
    },

    // Hindi
    'hi': {
        languages: require('../../../../lang/languages-hi'),
        main: require('../../../../lang/main-hi')
    },

    // Croatian
    'hr': {
        languages: require('../../../../lang/languages-hr'),
        main: require('../../../../lang/main-hr')
    },

    // Hungarian
    'hu': {
        languages: require('../../../../lang/languages-hu'),
        main: require('../../../../lang/main-hu')
    },

    // Islenska
    'is': {
        languages: require('../../../../lang/languages-is'),
        main: require('../../../../lang/main-is')
    },

    // Italian
    'it': {
        languages: require('../../../../lang/languages-it'),
        main: require('../../../../lang/main-it')
    },

    // Japanese
    'ja': {
        languages: require('../../../../lang/languages-ja'),
        main: require('../../../../lang/main-ja')
    },

    // Korean
    'ko': {
        languages: require('../../../../lang/languages-ko'),
        main: require('../../../../lang/main-ko')
    },

    // Latvian
    'lv': {
        languages: require('../../../../lang/languages-lv'),
        main: require('../../../../lang/main-lv')
    },

    // Norsk
    'nb': {
        languages: require('../../../../lang/languages-nb'),
        main: require('../../../../lang/main-nb')
    },

    // Dutch
    'nl': {
        languages: require('../../../../lang/languages-nl'),
        main: require('../../../../lang/main-nl')
    },

    // Polish
    'pl': {
        languages: require('../../../../lang/languages-pl'),
        main: require('../../../../lang/main-pl')
    },

    // Portuges
    'pt': {
        languages: require('../../../../lang/languages-pt'),
        main: require('../../../../lang/main-pt')
    },

    // Romanian
    'ro': {
        languages: require('../../../../lang/languages-ro'),
        main: require('../../../../lang/main-ro')
    },

    // Russian
    'ru': {
        languages: require('../../../../lang/languages-ru'),
        main: require('../../../../lang/main-ru')
    },

    // Slovak
    'sk': {
        languages: require('../../../../lang/languages-sk'),
        main: require('../../../../lang/main-sk')
    },

    // Swedish
    'sv': {
        languages: require('../../../../lang/languages-sv'),
        main: require('../../../../lang/main-sv')
    },

    // Thai
    'th': {
        languages: require('../../../../lang/languages-th'),
        main: require('../../../../lang/main-th')
    },

    // Turkish
    'tr': {
        languages: require('../../../../lang/languages-tr'),
        main: require('../../../../lang/main-tr')
    },

    // Unkraina
    'uk': {
        languages: require('../../../../lang/languages-uk'),
        main: require('../../../../lang/main-uk')
    },

    // Chinese (China)
    'zhCN': {
        languages: require('../../../../lang/languages-zhCN'),
        main: require('../../../../lang/main-zhCN')
    }
};

// Register all builtin languages with the i18n library.
for (const name in _LANGUAGES) { // eslint-disable-line guard-for-in
    const { languages, main } = _LANGUAGES[name];

    i18next.addResourceBundle(
        name,
        'languages',
        languages,
        /* deep */ true,
        /* overwrite */ true);
    i18next.addResourceBundle(
        name,
        'main',
        main,
        /* deep */ true,
        /* overwrite */ true);
}
