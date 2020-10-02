import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

export class HeaderCloseButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.touchable} onPress={this.props.onPress.bind(this)}>
                <Image
                    style={styles.image}
                    source={require('../../../../Sources/Headermenu/closeMenu_over.png')}
                />
            </TouchableOpacity>
        );
    }
}

export const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        height: 50,
    },
    image: {
        width: 20,
        height: 20,
        margin: 10,
        marginLeft: 5,
    },
});
