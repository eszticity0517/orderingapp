import React, { Component } from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import { AmountActionButton } from './components/amount-action-button';
import { AmountDisplay } from './components/amount-display';
import styles from './product-element-amount-selector.scss';

export class ProductElementAmountSelector extends Component
{
    render()
    {
        if (this.props.hidden)
        {
            return (<View style={styles.selectorContainer} />);
        }

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

