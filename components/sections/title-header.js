import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SeparatorLine } from '../common/separator-line';

export class TitleHeader extends Component
{
    render()
    {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
                <SeparatorLine />
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        fontSize: 20,
        margin: 10,
    },
});


