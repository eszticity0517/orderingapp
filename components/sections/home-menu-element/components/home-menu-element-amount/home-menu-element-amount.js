import React, {Component} from 'react';
import {Text} from 'react-native';
import '../../../../../global';
import styles from './home-menu-element-amount.scss';

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