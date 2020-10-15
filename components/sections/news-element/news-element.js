import React, {Component} from 'react';
import {Image, Text, View } from 'react-native';
import mainStyles from '../../../main-styles.scss';
import styles from './news-element.scss';

export class NewsElement extends Component
{
    render()
    {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.block, { flex: 0.3 }]}>
                    <Image source={this.props.source} style={{ width: 40, height: 40 }} />
                </View>
                <View style={[styles.block, { flex: 1 }]}>
                    <Text style={mainStyles.thickerGreenText}>{this.props.text}</Text>
                    <Text style={mainStyles.thickerBlackText}>{this.props.unitprice} Ft.- / {this.props.unit}</Text>
                </View>
            </View>
        );
    }
}
