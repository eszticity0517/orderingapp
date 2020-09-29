import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export class Container extends Component
{
    render()
    {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});