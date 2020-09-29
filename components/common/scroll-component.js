import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';

export class ScrollComponent extends Component
{
    render()
    {
        if (this.props.appearance && this.props.appearance === "view")
        {
            return (
                <View style={[styles.scrollComponent, this.props.style]}>
                    {this.props.children}
                </View>
            );
        }
        else
        {
            return (
                <ScrollView style={[styles.scrollComponent, { overflow: "scroll" }, this.props.style]}>
                    {this.props.children}
                </ScrollView>
            );
        }

    }
}

export const styles = StyleSheet.create({
    scrollComponent: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 50
    }
});
