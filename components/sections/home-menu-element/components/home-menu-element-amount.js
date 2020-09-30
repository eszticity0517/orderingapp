import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import '../../../../global';

export class HomeMenuElementAmount extends Component
{
    constructor()
    {
        super();
        this.state = {
            size: global.size,
        };
    }

    render()
    {
        return (
            <Text
                onPress={this.props.onPress.bind(this)}
                style={[styles.amountText, {marginTop: ((this.state.size.height - this.state.size.height / 3 - 100) / 3 / 2) - 10 }]}
            >
                {this.props.amount}
            </Text>
        );
    }
}

export const styles = StyleSheet.create({
    amountText: {
        color: 'green',
        fontWeight: '400',
        textAlign: 'center',
        flex: 1,
    },
});
