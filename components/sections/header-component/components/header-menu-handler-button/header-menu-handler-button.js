import React, { Component } from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './header-menu-handler-button.scss';

export class HeaderMenuHandlerButton extends Component
{
    render()
    {
        return (
            <TouchableOpacity style={styles.touchable} onPress={this.props.onMenuOpenPress.bind(this)}>
            <Image
                style={styles.buttonImage}
                source={require('../../../../../Sources/Headermenu/openMenu_over.png')}
            />
        </TouchableOpacity>
        );
    }
}
