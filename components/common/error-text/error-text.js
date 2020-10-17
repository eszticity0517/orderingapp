import React, {Component} from 'react';
import {Text} from 'react-native';
import styles from './error-text.scss';

export class ErrorText extends Component
{
    render()
    {
        return (
          <Text style={styles.redText}>{' ' + this.props.text}</Text>
        );
    }
}
