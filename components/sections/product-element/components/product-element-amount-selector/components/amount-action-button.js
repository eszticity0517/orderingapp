import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import mainStyles from '../../../../../../main-styles.scss';

export class AmountActionButton extends Component {
    render()
    {
        return (
            <TouchableOpacity
                onPress={() => this.props.onPress(this.props.product.uid, this.renderChangeAmount())}
                style={mainStyles.amountActionContainer}
            >
                {this.renderButtonText()}
            </TouchableOpacity>
        );
    }

    renderButtonText()
    {
        return (this.props.mode === 'increase' ? (<Text>+</Text>) : <Text>-</Text>);
    }

    renderChangeAmount()
    {
        return (this.props.mode === 'increase' ? 1 : -1);
    }
}


