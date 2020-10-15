import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './button-container.scss';

export class ButtonContainer extends Component
{
    render()
    {
        let container = null;
        let style= this.props.style ? [styles.buttonContainer, this.props.style] : styles.buttonContainer;

        if (!this.props.hidden || this.props.hidden === false)
        {
            container = (<View style={style}>{this.props.children}</View>);
        }

        return (container);
    }
}