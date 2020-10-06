import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { AmountActionButton } from './components/amount-action-button';
import { AmountDisplay } from './components/amount-display';

export class ProductElementAmountSelector extends Component
{
    render()
    {
        return (
            <View style={styles.selectorContainer}>
                <View style={styles.innerContainer}>
                    <AmountActionButton onPress={this.props.onCounterButtonPress.bind(this)} mode="decrease"/>
                    <AmountDisplay product={this.props.product}/>
                    <AmountActionButton onPress={this.props.onCounterButtonPress.bind(this)} mode="increase"/>
                </View>
                <TouchableOpacity onPress={this.showActionSheet} style={styles.touchable} >
                    <Text>{this.props.product.kivalasztottegyseg}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    selectorContainer: {
        flex: 0.1,
        height: 20 * 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        flexDirection: 'row',
        height: 20 * 1.5,
        backgroundColor: '#e4eef0',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    touchable: {
        backgroundColor: '#e4eef0',
        height: 20 * 2, flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

