import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import '../../../../../global';
import styles from './home-menu-element-name.scss';

export class HomeMenuElementName extends PureComponent
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
                style={[styles.name, {marginTop: ((this.state.size.height - this.state.size.height / 3 - 100) / 3 / 2) - 10}]}
            >
                {this.props.text}
            </Text>
        );
    }
}