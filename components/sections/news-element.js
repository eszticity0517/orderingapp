import React, {Component} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import mainStyles from '../../main-styles.scss';

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

export const styles = StyleSheet.create({
    block: {
        height: 20 * 4,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
});


