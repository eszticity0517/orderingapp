import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './order-element-icon-button.scss';

export class OrderElementIconButton extends Component
{
    render()
    {
        return (
            <TouchableOpacity style={styles.touchablePart} onPress={(value) => this.props.onPress('Reorder')}>
                <Image
                    style={styles.image}
                    source={require('../../../../../Sources/Orders/right-angle-arrow-icon-76339.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}
