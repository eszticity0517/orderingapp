import React, {Component} from 'react';
import {View} from 'react-native';
import '../../../global';
import { HomeMenuElementAmount } from './components/home-menu-element-amount';
import { HomeMenuElementContainer } from './components/home-menu-element-container';
import { HomeMenuElementIcon } from './components/home-menu-element-icon';
import { HomeMenuElementName } from './components/home-menu-element-name';

export class HomeMenuElement extends Component
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
            <HomeMenuElementContainer>
                <HomeMenuElementIcon source={this.props.source} onPress={this.props.onPress.bind(this)} />
                <HomeMenuElementName text={this.props.text} onPress={this.props.onPress.bind(this)} />
                <HomeMenuElementAmount amount={this.props.number} onPress={this.props.onPress.bind(this)}/>
            </HomeMenuElementContainer>
        );
    }
}
