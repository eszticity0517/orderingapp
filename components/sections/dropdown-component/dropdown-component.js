import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './dropdown-component.scss';

export class DropdownComponent extends Component
{
    render()
    {
        if (!this.props.hidden)
        {
            return (
                <TouchableOpacity onPress={this.props.onPress.bind(this)}>
                    <View style={styles.innerContainer}>
                        <View style={{ flex: 9 }}>
                            <Text>{this.props.title}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Image
                                source={require('../../../Sources/Products/icon-arrow-down-b-512.png')}
                                style={{ width: 20 / 1.5, height: 20 / 1.5 }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
        else
        {
            return null;
        }
    }
}