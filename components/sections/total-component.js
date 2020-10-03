import React, {Component} from 'react';
import {Text, View, StyleSheet, AppRegistry } from 'react-native';
import '../../global';

export class TotalComponent extends Component
{
    render()
    {
        let background = this.props.light ? 'white' : '#77D353';
        let color = this.props.light ? 'black' : 'white';

        return (
            <View style={[styles.totalContainer, {
                width: '100%',
                backgroundColor: background,
            }]}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: color }}>{this.props.text.toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: color, alignSelf: 'flex-end' }}>{this.props.sum} Ft.-</Text>
                </View>
            </View>
        );
    }
}
export const styles = StyleSheet.create({
    totalContainer: {
        height: 20 * 1.5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#77D353',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
    },
});
