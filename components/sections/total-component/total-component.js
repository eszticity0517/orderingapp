import React, {Component} from 'react';
import {Text, View } from 'react-native';
import '../../../global';
import styles from './total-component.scss';

export class TotalComponent extends Component
{
    render()
    {
        return (
            <View style={[styles.totalContainer, this._renderContainerStyle()]}>
                <View style={styles.innerContainer}>
                    <Text style={{ color: this._renderColor() }}>{this.props.text.toUpperCase()}</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={this._renderPriceStyle()}>{this.props.sum} Ft.-</Text>
                </View>
            </View>
        );
    }

    _renderPriceStyle()
    {
        return ({ color: this._renderColor(), alignSelf: 'flex-end' });
    }

    _renderColor()
    {
        return (this.props.light ? 'black' : 'white');
    }

    _renderContainerStyle()
    {
        return ({
            width: '100%',
            backgroundColor: this._renderBackgroundColor(),
        });
    }

    _renderBackgroundColor()
    {
        return (this.props.light ? 'white' : '#77D353');
    }
}
