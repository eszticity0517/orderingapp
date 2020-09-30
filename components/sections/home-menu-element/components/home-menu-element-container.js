import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import '../../../../global';

export class HomeMenuElementContainer extends Component
{
    constructor()
    {
        super();
        this.state = {
            size: global.size,
        };
    }

    render()
    {
        return (
            <View style={[styles.container, { height: (this.state.size.height - this.state.size.height / 3 - 100) / 3 }]}>
                {this.props.children}
            </View>
        );
    }
}


export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#898989',
    },
});

