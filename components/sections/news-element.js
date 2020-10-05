import React, {Component} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

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
                    <Text style={styles.thickerGreenText}>{this.props.text}</Text>
                    <Text style={styles.thickerBlackText}>{this.props.unitprice} Ft.- / {this.props.unit}</Text>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    thickerGreenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
    thickerBlackText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
    block: {
        height: 20 * 4,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
});


