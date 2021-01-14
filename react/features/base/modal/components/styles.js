// @flow

import icw from '../../../../custom/constants';
import { ColorSchemeRegistry } from '../../color-scheme';

export default {
    safeArea: {
        flex: 1
    }
};

ColorSchemeRegistry.register('Modal', {
    page: {
        alignItems: 'stretch',
        backgroundColor: icw.background.page
    }
});
