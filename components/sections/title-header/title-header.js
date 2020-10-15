import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SeparatorLine } from '../../common/separator-line';
import styles from './title-header.scss';

export class TitleHeader extends Component
{
    render()
    {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
                <SeparatorLine />
            </View>
        );
    }
}