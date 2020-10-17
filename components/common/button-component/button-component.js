import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './button-component.scss';

export class ButtonComponent extends Component
{
    render()
    {
        var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#323232';

        if (this.props.type && this.props.type === 'stretch')
        {
            return (
                <View style={styles.buttonMainContainer}>
                    <TouchableOpacity onPress={this.props.onPress.bind(this)} style={styles.touchableHighlightStyle}>
                        <View style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}>
                            <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else
        {
            return (
                <TouchableOpacity onPress={this.props.onPress.bind(this)} style={styles.touchableHighlightStyle}>
                    <View style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}>
                        <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}
