import React from 'react';
import { Component } from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './indicator.scss';

export class Indicator extends Component
{
    render()
    {
        if (this.props.visible)
        {
            return (
                <View style={styles.indicator}>
                    <ActivityIndicator
                        size="large"
                        color={this.props.color || '#fff'}
                        style={{margin: 'auto', backgroundColor: 'transparent'}}
                        hidesWhenStopped={true}
                    />
                </View>
            );
        }

        return null;
    }
}
