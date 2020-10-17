import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styles from './footer-icon-button.scss';

export class FooterIconButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.onPress('Home')}>
                <Image
                    style={styles.buttonImage}
                    source={this.props.source}
                />
            </TouchableOpacity>
        );
    }
}