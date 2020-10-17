import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './separator-line.scss';

export class SeparatorLine extends Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return (
            <View
                style={[styles.line, this.props.style]}
            />
        );
    }
}
