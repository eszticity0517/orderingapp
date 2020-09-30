import React, {Component} from 'react';

import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';


export class OrderElementIconButton extends Component
{
    render()
    {
        return (
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', height: 80 }} onPress={(value) => this.props.onPress('Reorder')}>
                <Image
                    style={{ width: 20, height: 20, margin: 10 }}
                    source={require('../../../../Sources/Orders/right-angle-arrow-icon-76339.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}
