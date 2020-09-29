import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function Indicator(props)
{
    if (props.visible)
	{
        return (
            <View style={styles.indicator}>
                <ActivityIndicator
                    size="large"
                    color={props.color || '#fff'}
                    style={{margin: 'auto', backgroundColor: 'transparent'}}
                    hidesWhenStopped={true}
                />
            </View>
        );
    }
	
    return null;
}

export const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: props.transparent ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.4)'
    }
});