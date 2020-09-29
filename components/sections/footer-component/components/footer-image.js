import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

export class FooterImage extends Component {
    render() {
        return (
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', height: 40, alignContent: 'center' }} onPress={(value) => this.onPress('Home')}>
                <Image
                    style={{ width: 30, height: 30, marginTop: 5 }}
                    source={this.props.source}
                />
            </TouchableOpacity>
        );
    }
}