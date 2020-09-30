import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export class HomeMenuElementIcon extends PureComponent
{
    render()
    {
        return (
            <TouchableOpacity style={{ flex: 0.5 }} onPress={this.props.onPress.bind(this)}>
                <Image source={this.props.source} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
        );
    }
}

export const styles = StyleSheet.create({
    image:
    {
        flex: 1,
        width: 20 * 1.5,
        height: 20 * 1.5,
    },
});

