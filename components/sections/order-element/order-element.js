import React, {Component} from 'react';

import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { OrderElementContainer } from './components/order-element-container';
import { OrderElementIconButton } from './components/order-element-icon-button';

export class OrderElement extends Component
{
    constructor()
    {
        super();
        this.state = {
            isChecked: false,
        };
    }

    render()
    {
        return (
            <OrderElementContainer>
                <View style={{ flex: 5, height: 80, justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={styles.thickerGreenText}>{this.props.response.kelt}</Text>
                    <Text numberOfLines={1} style={{ fontStyle: 'italic' }}>({this.renderTermekek()}</Text>
                </View>

                <OrderElementIconButton onPress={this.onPress.bind(this)} />
            </OrderElementContainer>
        );
    }

    renderTermekek()
    {
        let termekek = '';

        for (let i = 0; i < this.props.response.items.length; i++)
        {
            termekek += this.props.response.items[i].megn;

            if (this.props.response.items.length - 1 !== i)
            {
                termekek += ', ';
            }
        }

        return termekek;
    }

    onPress(value)
    {
        this.props.navigation.navigate('Reorder', { order: this.props.response });
    }

    onCheck()
    {
        if (this.state.isChecked)
        {
            this.setState(state =>
            {
                state.isChecked = false;
                return state;
            });
        }
        else
        {
            this.setState(state =>
            {
                state.isChecked = true;
                return state;
            });
        }
    }
}

export const styles = StyleSheet.create({
    thickerGreenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
});

