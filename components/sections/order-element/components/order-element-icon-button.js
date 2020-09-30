import React, {Component} from 'react';

import {Image, TouchableOpacity, StyleSheet} from 'react-native';


export class OrderElementIconButton extends Component
{
    render()
    {
        return (
            <TouchableOpacity style={styles.touchablePart} onPress={(value) => this.props.onPress('Reorder')}>
                <Image
                    style={styles.image}
                    source={require('../../../../Sources/Orders/right-angle-arrow-icon-76339.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

export const styles = StyleSheet.create({
    touchablePart: {
        flex: 1,
        justifyContent: 'center',
        height: 80,
    },
    image : {
        width: 20,
        height: 20,
        margin: 10,
    },
});

