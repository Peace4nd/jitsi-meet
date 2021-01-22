// @flow

import React from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';

import icw from './constants';

// nejake konstanty
const LOADING_SIZE = 36;
const LOADING_BORDER = 4;
const LOADING_DURATION = 1100;

// potrebne styly
const styles = StyleSheet.create({
    wrapper: {
        borderBottomColor: icw.loading.base,
        borderLeftColor: icw.loading.notch,
        borderRadius: LOADING_SIZE / 2,
        borderRightColor: icw.loading.base,
        borderTopColor: icw.loading.base,
        borderWidth: LOADING_BORDER,
        height: LOADING_SIZE,
        width: LOADING_SIZE
    }
});

// vlastnosti
type Props = {
    style?: *
};

// komponenta
const IcewarpLoading = (props: Props) => {
    // rozlozeni props
    const { style } = props || {};

    // definice animovane hodnoty
    const spinValue = new Animated.Value(0);

    // definice animace
    Animated.loop(
    Animated.timing(spinValue, {
        toValue: 1,
        duration: LOADING_DURATION,
        easing: Easing.linear,
        useNativeDriver: true
    })
    ).start();

    // priprava interpolace animovane hodnoty
    const spin = spinValue.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ '0deg', '360deg' ]
    });

    // sestaveni a vraceni
    return <Animated.View style = { [ styles.wrapper, style, { transform: [ { rotate: spin } ] } ] } />;
};

// export
export default IcewarpLoading;
