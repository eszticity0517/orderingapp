import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import '../../../../global';

export class HomeMenuElementName extends PureComponent
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
            <Text
                onPress={this.props.onPress.bind(this)}
                style={[styles.name, {marginTop: ((this.state.size.height - this.state.size.height / 3 - 100) / 3 / 2) - 10}]}
            >
                {this.props.text}
            </Text>
        );
    }
}

export const styles = StyleSheet.create({
    name:
    {
        flex: 2,
        textTransform: 'uppercase',
    },
});
