import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import mainStyles from '../../main-styles.scss';

export class OpeningMenuElement extends Component
{
    render()
    {
        return (
            <View flexDirection="row" style={{ height: 40 }}>
                <TouchableOpacity style={{ flex: 0.5, justifyContent: "center", height: 40 }} onPress={this.props.onPress.bind(this)}>
                    <Image
                        style={mainStyles.image}
                        source={this.props.source}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 40, flex: 1, justifyContent: "center" }} onPress={this.props.onPress.bind(this)}>
                    <Text>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
