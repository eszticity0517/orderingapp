import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import mainStyles from '../../main-styles.scss';
import styles from './opening-menu-element.scss';

export class OpeningMenuElement extends Component
{
    render()
    {
        return (
            <View flexDirection="row" style={styles.mainContainer}>
                <TouchableOpacity style={styles.menuElementIcon} onPress={this.props.onPress.bind(this)}>
                    <Image
                        style={mainStyles.image}
                        source={this.props.source}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuElementName} onPress={this.props.onPress.bind(this)}>
                    <Text>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
