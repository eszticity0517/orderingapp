import React, {Component} from 'react';
import {View} from 'react-native';
import '../../../../../global';
import styles from './home-menu-element-container.scss';

export class HomeMenuElementContainer extends Component
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
            <View style={[styles.container, { height: (this.state.size.height - this.state.size.height / 3 - 100) / 3 }]}>
                {this.props.children}
            </View>
        );
    }
}

