import React, {Component} from 'react';

import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

export class OrderElement extends Component
{
    constructor()
    {
        super();
        this.state = {
            isChecked: false,
        };
    }

    render()
    {
        let termekek = '';

        for (let i = 0; i < this.props.response.items.length; i++)
        {
            termekek += this.props.response.items[i].megn;

            if (this.props.response.items.length - 1 !== i)
            {
                termekek += ' ,';
            }
        }

        return (
            <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1 }}>
                {/* <TouchableOpacity style={{ flex: 1, height: 80, justifyContent: "center" }}>
                    <CheckBox value={this.state.isChecked} onValueChange={this.onCheck.bind(this)} />
                </TouchableOpacity> */}
                <View style={{ flex: 5, height: 80, justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={styles.thickgreentext}>{this.props.response.kelt}</Text>
                    <Text numberOfLines={1} style={{ fontStyle: 'italic' }}>({termekek}</Text>

                </View>
                <View style={{ flex: 0.5, height: 80, justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={{ fontStyle: 'italic', marginTop: 14 }}>)</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', height: 80 }} onPress={(value) => this.onPress('Reorder')}>
                    <Image
                        style={{ width: 20, height: 20, margin: 10 }}
                        source={require('../../Sources/Orders/right-angle-arrow-icon-76339.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        );
    }

    onPress(value)
    {
        this.props.navigation.navigate('Reorder', { order: this.props.response });
    }

    onCheck()
    {
        if (this.state.isChecked)
        {
            this.setState(state =>
            {
                state.isChecked = false;
                return state;
            });
        }
        else
        {
            this.setState(state =>
            {
                state.isChecked = true;
                return state;
            });
        }
    }
}

export const styles = StyleSheet.create({
    thickerGreenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#77D353',
    },
});

