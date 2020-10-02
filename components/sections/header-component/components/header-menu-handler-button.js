import React, { Component } from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

export class HeaderMenuHandlerButton extends Component
{
    render()
    {
        return (
            <TouchableOpacity style={{ flex: 1, height: 50 }} onPress={this.props.onMenuOpenPress.bind(this)}>
            <Image
                style={{ width: 20, height: 20, margin: 10, position: 'absolute', right: 0 }}
                source={require('../../../../Sources/Headermenu/openMenu_over.png')}
            />
        </TouchableOpacity>
        );
    }
}
