import React, {Component} from 'react';

import {View, StyleSheet} from 'react-native';


export class OrderElementContainer extends Component
{
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
});
