import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import '../../global';

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
            <View style={{ flexDirection: 'row', height: (this.state.size.height - this.state.size.height / 3 - 100) / 3, borderBottomWidth: 2, borderBottomColor: '#898989' }}>
                <TouchableOpacity style={{ flex: 0.5 }} onPress={this.props.onPress.bind(this)}>
                    <Image source={this.props.source} style={{ flex: 1, width: 20 * 1.5, height: 20 * 1.5 }} resizeMode="contain" />
                </TouchableOpacity>

                <Text
                    onPress={this.props.onPress.bind(this)}
                    style={{ flex: 2, marginTop: ((this.state.size.height - this.state.size.height / 3 - 100) / 3 / 2) - 10 }}>{this.props.text}
                </Text>
                <Text
                    onPress={this.props.onPress.bind(this)}
                    style={{ color: 'green', fontWeight: '400', textAlign: 'center', flex: 1, marginTop: ((this.state.size.height - this.state.size.height / 3 - 100) / 3 / 2) - 10 }}>{this.props.number}
                </Text>
            </View>
        );
    }
}
