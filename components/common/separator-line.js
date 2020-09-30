import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export class SeparatorLine extends Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return (
            <View
                style={styles.line}
            />
        );
    }
}

export const styles = StyleSheet.create({
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});

