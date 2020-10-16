import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './scroll-component.scss';

export class ScrollComponent extends Component
{
    render()
    {
        if (this.props.appearance && this.props.appearance === 'view')
        {
            return (
                <View style={[styles.scrollComponent, this.props.style]}>
                    {this.props.children}
                </View>
            );
        }
        else
        {
            return (
                <ScrollView style={[styles.scrollComponent, this.props.style]}>
                    {this.props.children}
                </ScrollView>
            );
        }

    }
}
