import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styles from './header-close-button.scss';

export class HeaderCloseButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.touchable} onPress={this.props.onPress.bind(this)}>
                <Image
                    style={styles.image}
                    source={require('../../../../../Sources/Headermenu/closeMenu_over.png')}
                />
            </TouchableOpacity>
        );
    }
}