import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './order-element-container.scss';

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